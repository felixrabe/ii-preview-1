#!/usr/bin/env bashsh-0

CMD cd "$DIR"

[[ -d './node_modules' ]] || CMD yarn
[[ -d './jspm_packages' ]] || CMD yarn run jspm -- install

CMD yarn lint-fix
CMD yarn test

# CMD_STR '( sleep 3 ; open "http://localhost:8080" ) &'
# CMD http-server
