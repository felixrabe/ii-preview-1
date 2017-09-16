package main

import (
	"bufio"
	"encoding/json"
	"errors"
	"io"
	"log"
	"net"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

func main() {
	scriptPath, sockPath, wd, cmds, args, err := parseArguments()
	if err != nil {
		log.Fatal(err)
	}

	if _, err := os.Stat(sockPath); os.IsNotExist(err) {
		if cmds["shutdown"] {
			os.Exit(0)
		}
		startDaemon(scriptPath, sockPath)
	}

	conn, err := net.Dial("unix", sockPath)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	handleConnection(conn, wd, args)
}

var knownCmds = map[string]bool{
	"shutdown": false,
}

func parseArguments() (scriptPath, sockPath, wd string, cmds map[string]bool, args []string, err error) {
	cmds = make(map[string]bool)
	for k, v := range knownCmds {
		cmds[k] = v
	}

	// script.js --cmd1 --cmd2 args...
	// --cmd1 script.js --cmd2 args...
	// --cmd1 --cmd2 script.js args...
	cmdArgs := []string{}
	for _, arg := range os.Args[1:] {
		if len(args) == 0 {
			if strings.HasPrefix(arg, "--") {
				if _, ok := cmds[arg[2:]]; ok {
					cmds[arg[2:]] = true
					cmdArgs = append(cmdArgs, arg)
					continue
				}
			} else {
				if scriptPath == "" {
					scriptPath = arg
					continue
				}
			}
		}
		args = append(args, arg)
	}

	if scriptPath == "" {
		err = errors.New("Script path argument required.")
		return
	}

	if len(cmdArgs) == 0 {
		wd, err = os.Getwd()
		if err != nil {
			return
		}
	}

	scriptPath, err = filepath.Abs(scriptPath)
	if err != nil {
		return
	}
	sockPath = strings.TrimSuffix(scriptPath, ".js") + ".sock"
	args = append(cmdArgs, args...)

	return
}

func startDaemon(scriptPath, sockPath string) {
	cmd := exec.Command("ii-cli-server", scriptPath)
	err := cmd.Start()
	if err != nil {
		log.Fatal(err)
	}
	timeoutAfter := time.Now().Add(2 * time.Second)
	for {
		if _, err := os.Stat(sockPath); !os.IsNotExist(err) {
			break
		}
		if time.Now().After(timeoutAfter) {
			log.Fatal("Timeout")
		}
		// log.Printf("Waiting for daemon...")
		time.Sleep(20 * time.Millisecond)
	}
}

func handleConnection(conn net.Conn, wd string, args []string) {
	var ii *II

	ii = readII(conn)
	if !iiEqual(ii, iiInit) {
		log.Fatal(errors.New("Invalid init data."))
	}

	ii = &II{append([]string{wd}, args...)}
	writeII(conn, ii)

	closed := make(chan bool)
	fromStdin := read(os.Stdin, closed)
	fromConn := read(conn, closed)

	go func() {
		for {
			var x []byte
			select {
			case x = <-fromStdin:
				if x != nil {
					conn.Write(x)
				}
			case x = <-fromConn:
				if x != nil {
					os.Stdout.Write(x)
				}
			}
			if x == nil {
				closed <- true
			}
		}
	}()

	<-closed
}

func read(r io.Reader, closed chan<- bool) <-chan []byte {
	c := make(chan []byte)

	go func() {
		b := bufio.NewReader(r)

		for {
			bytes, err := b.ReadBytes('\n')
			if err != nil {
				c <- nil
				// closed <- true
				return
			}
			c <- bytes
		}
	}()

	return c
}

type II struct {
	II []string `json:"ii"`
}

var iiInit = &II{[]string{"hello", "0.1.0"}}

func iiEqual(ii1, ii2 *II) bool {
	if len(ii1.II) != len(ii2.II) {
		return false
	}
	for i := range ii1.II {
		s1 := ii1.II[i]
		s2 := ii2.II[i]
		if s1 != s2 {
			return false
		}
	}
	return true
}

func readII(r io.Reader) *II {
	b := bufio.NewReader(r)

	bytes, err := b.ReadBytes('\n')
	if err != nil {
		log.Fatal(err)
	}

	var ii *II
	// fmt.Printf("%v\n", string(bytes))
	err = json.Unmarshal(bytes, &ii)
	if err != nil {
		log.Fatal(err)
	}

	return ii
}

func writeII(w io.Writer, ii *II) {
	bytes, err := json.Marshal(ii)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(append(bytes, '\n'))
}
