#!/usr/bin/env bashsh-0

cd "$DIR/.."
CMD pwd
if [[ -e ~/.config/ii-1/daemon-pid ]] ; then
  CMD_STR 'kill $(cat ~/.config/ii-1/daemon-pid) ; rm -rf ~/.config/ii-1' || true
fi
CMD ./node_modules/.bin/nodemon -e js,json,jsx ./daemon.js
