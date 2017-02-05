#!/usr/bin/env bash
set -e

echo Copying Dart source files...

rm -rf /usr/local/domio_public/app
yes | mv -f ~/domioclient/src/app /usr/local/domio_client

echo Dart source files copied!