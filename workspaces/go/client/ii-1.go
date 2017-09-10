package main

import (
	"bufio"
	"encoding/json"
	// "fmt"
	"io"
	"log"
	"net"
	"os"
	"os/exec"
	"os/user"
	"path/filepath"
	"time"
)

func main() {
	user, err := user.Current()
	if err != nil {
		log.Fatal(err)
	}
	sockPath := filepath.Join(user.HomeDir, ".config", "ii-1-daemon", "sock")
	if _, err := os.Stat(sockPath); os.IsNotExist(err) {
		startDaemon(sockPath)
	}
	connectToDaemon(sockPath)
}

func startDaemon(sockPath string) {
	cmd := exec.Command("ii-1-daemon")
	// log.Printf("Starting daemon...")
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
		time.Sleep(100 * time.Millisecond)
	}
}

func connectToDaemon(sockPath string) {
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	conn, err := net.Dial("unix", sockPath)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	bytes, err := json.Marshal(append([]string{wd}, os.Args[1:]...))
	if err != nil {
		log.Fatal(err)
	}
	bytes = append(bytes, '\n')

	w := bufio.NewWriter(conn)
	if _, err := w.Write(bytes); err != nil {
		log.Fatal(err)
	}
	w.Flush()

	conn.(*net.UnixConn).CloseWrite()

	if _, err := io.Copy(os.Stdout, conn); err != nil {
		log.Fatal(err)
	}
}
