#!/usr/bin/env bash

PROJECT_NAME=domio_client

buildstamp=`date -u '+%s'`
hash=`git rev-parse --short HEAD`
version=`git tag -l --points-at HEAD`


echo
echo ---------------------------
echo "  Buildstamp: ${buildstamp}"
echo "  Hash:       ${hash}"
echo "  Version:    ${version}"
echo ---------------------------
echo


#echo "export function getAppInfo() { return {version: '${version}', env: 'dev', api_url: '//localhost:8080'} }" > src/scripts/app_info.js

npm run style
/cygdrive/c/dart-sdk/bin/pub.bat get
/cygdrive/c/dart-sdk/bin/pub.bat build src/app --output=/usr/local/domio_client/js

#echo "export function getAppInfo() { return '%VERSION%' }" > src/scripts/app_info.js