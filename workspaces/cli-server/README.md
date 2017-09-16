Requirements:

-   Node.js
-   Bash
-   nc (netcat)

Use `fastnode` like `node`, but run scripts faster.

To make scripts work in both environments, implicitly return (as in
`vm.run...()`) a Promise that resolves upon completion. See `doc/example.js`.

Usage:

    fastnode path/to/cli-script.js ...args

Upon first invocation, starts a persistent server process (implemented in
`bin/server.js`) for the given script and opens a socket at `path/to/cli-
script.sock`. This is then used to communicate arguments and redirect
stdin/stdout.

TODO

- Find out why there is a `console` object defined in `vm.runInNewContext`.

- Contexts are different between the vm-executed code and transient required modules.
