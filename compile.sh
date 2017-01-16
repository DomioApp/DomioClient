#!/usr/bin/env bash

PROJECT_NAME=domio_public

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

platform='unknown'
unamestr=`uname`
if [[ "$unamestr" == 'CYGWIN_NT-10.0' ]]; then
   platform='cygwin'
elif [[ "$unamestr" == 'FreeBSD' ]]; then
   platform='freebsd'
fi


if [ $platform == "cygwin" ]
    then
        echo Compiling for Windows...
        echo Output folder: /usr/local/bin/${PROJECT_NAME}_win.exe
        export GOARCH=amd64
        export GOOS=windows
        go build -o /usr/local/bin/${PROJECT_NAME}_win.exe -ldflags "-X main.Buildstamp=$buildstamp -X main.Hash=$hash  -X main.Version=$version" ${PROJECT_NAME}

fi




#echo Compiling for Linux...
#export GOARCH=amd64
#export GOOS=linux
#go build -o /usr/local/bin/${PROJECT_NAME}_linux -ldflags "-X main.Buildstamp=$buildstamp -X main.Hash=$hash  -X main.Version=$version" ${PROJECT_NAME}

#echo Compiling for Mac...
#export GOARCH=amd64
#export GOOS=darwin
#go build -o /usr/local/bin/${PROJECT_NAME}_mac -ldflags "-X main.Buildstamp=$buildstamp -X main.Hash=$hash  -X main.Version=$version" ${PROJECT_NAME}
