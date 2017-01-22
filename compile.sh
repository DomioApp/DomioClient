#!/usr/bin/env bash

PROJECT_NAME=domio_client

#buildstamp=`date -u '+%Y-%m-%d_%I:%M:%S'`
buildstamp=`date -u '+%s'`
hash=`git rev-parse --short HEAD`
version=`git tag -l --points-at HEAD`


#export GOPATH=${PWD}

echo
echo ---------------------------
echo "  Buildstamp: ${buildstamp}"
echo "  Hash:       ${hash}"
echo "  Version:    ${version}"
echo ---------------------------
echo


echo "export function getAppInfo() { return '${version}' }" > src/scripts/app_info.js

npm run all

echo "export function getAppInfo() { return '%VERSION%' }" > src/scripts/app_info.js