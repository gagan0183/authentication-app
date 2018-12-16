#!/usr/bin/env bash

set -ex

if ! shellcheck -v > /dev/null; then
  echo "Installing shellcheck"
  brew install shellcheck
fi


# Install git hooks in local git directory
git config core.hooksPath scripts/githooks
