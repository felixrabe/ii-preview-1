Constraints:

-   The value of `process.cwd()` needs to be saved at the start, because
    builtin modules (e.g. 'path') do not run in the same sandbox.

    Instead of `path.resolve('.')`, do:

        var cwd = process.cwd()
        ...
        path.resolve(cwd, '.')

-   If module is async, must return a Promise that resolves once module is
    complete.
