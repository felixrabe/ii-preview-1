#!/bin/bash

set -o errexit
set -o nounset

NODE=node

if [[ $# -lt 1 ]] ; then
  "$NODE"
  exit $?
fi

if [[ $1 == -* ]] ; then
  echo "ERROR: Options before script path are not yet supported." >&2
  exit 1
fi

DIR="$( cd "$( dirname "$0" )" && pwd )"

set +o errexit
  source readlink-f 2> /dev/null
  source "$DIR"/readlink-f 2> /dev/null
  source "$DIR"/../node_modules/.bin/readlink-f 2> /dev/null
set -o errexit

# in case of symlinked self
DIR="$( cd "$( dirname "$(readlink-f "$0")" )" && pwd )"

function MSG() {
  echo "# $@" >&2
}

# Usage: poll [!] file_or_socket_or_dir_or... i
function poll() {
  local test_prefix=
  if [[ $1 == ! ]] ; then
    test_prefix='!'
    shift
  fi
  local f=$1
  local infinite=false
  local i=1
  if [[ $# -lt 2 ]] ; then  # infinite
    infinite=true
  else
    i=$2  # x 0.02 s
  fi
  while [[ $i -gt 0 ]] ; do
    if eval "[[ $test_prefix -e \$f ]]" ; then
      return 0
    fi

    sleep 0.02
    if $infinite ; then continue ; fi
    ((i--))
  done
  return 1
}

function start_server() {
  local script=$1
  "$NODE" "$DIR/server.js" --silent "$script" &
}

function stdin() {
  local tmp=$1
  if poll ! "$tmp" 10 ; then
    cat &
    poll "$tmp"
  else
    MSG bad
  fi
  rm -f "$tmp"
}

function stdout() {
  local tmp=$1
  read init
  # MSG "first line: '$init'"
  if [[ $init != '{"ii":{"cli-server":"0.1.0","cmd":"init"}}' ]] ; then
    return 1
  fi
  MSG init
  rm -f "$tmp"
  while read line ; do
    if [[ $line == '{"ii":{"cli-server":"0.1.0","cmd":"end"}}' ]] ; then
      MSG end
      touch "$tmp"
    else
      echo "$line"
    fi
  done
}

function communicate() {
  local sock_path=$1
  MSG before
  local tmp=$(mktemp -t ii-cli-server)
  { stdin "$tmp" | nc -U "$sock_path" | stdout "$tmp" ; } || true
  MSG after
}

script=$1
script_base=${1%.js}
sock_path=$script_base.sock

if [[ ! -e $sock_path ]] ; then
  start_server "$script"
fi

if poll "$sock_path" 100 ; then
  communicate "$sock_path"
  exit 0
else
  echo "ERROR: Timeout waiting for '$sock_path'." >&2
  exit 1
fi
