#!/bin/bash

# based on: https://stackoverflow.com/a/1116890
function readlink-f() {
  pushd . > /dev/null

  local target_file=$1
  local redirections=100

  cd "$(dirname "$target_file")"
  target_file=$(basename "$target_file")
  while [[ -L $target_file ]] ; do
    redirections=$((redirections - 1))
    if [[ $redirections -eq 0 ]] ; then
      echo "ERROR: Recursive symlink detected." >&2
      return
    fi
    target_file=$(readlink "$target_file")
    cd "$(dirname "$target_file")"
    target_file=$(basename "$target_file")
  done

  target_file="$(pwd -P)/$target_file"
  # ("readlink-f /" => "///", so...)
  target_file=${target_file//\/\///}  # // => /
  target_file=${target_file//\/\///}  # // => /
  target_file=${target_file%/.}  # .../. => ... (for "readlink-f .")
  echo "$target_file"

  popd > /dev/null
}

if [[ "$0" = "${BASH_SOURCE[0]}" ]] ; then  # direct call
  readlink-f "$@"
# else  # "source readlink-f"
fi
