#!/usr/bin/env bashsh-0

cd "$DIR/.."
CMD pwd

CMD rm -rf jspm_packages
CMD rm -rf node_modules
CMD yarn
CMD yarn jspm -- install
