#!/usr/bin/env bashsh-0

cd "$DIR/.."
CMD pwd

CMD_STR 'rm -rf .esm-cache node_modules/.cache node_modules web/node_modules web/jspm_packages && yarn && (cd web && yarn && yarn jspm -- install)'
