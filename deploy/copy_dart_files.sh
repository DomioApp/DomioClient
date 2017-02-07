#!/usr/bin/env bash
set -e

echo Copying Dart source files...

rm -rf /usr/local/domio_client/app
yes | mv -f ~/domioclient/src/app /usr/local/domio_client
yes | mv -f /usr/local/domio_client/app/config.dart.sample /usr/local/domio_client/app/config.dart

echo Dart source files copied!