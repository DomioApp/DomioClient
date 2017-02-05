#!/usr/bin/env bash
set -e

echo Copying Dart source files...

rm -rf /usr/local/domio_public/dart
yes | mv -f ~/domioclient/src/app /usr/local/domio_public

echo Dart source files copied!