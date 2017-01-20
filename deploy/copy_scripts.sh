#!/usr/bin/env bash
set -e

bundles_folder=/usr/local/domio_client

echo Copying scripts files...

mkdir -p ${bundles_folder}/scripts

rm -rf ${bundles_folder}

yes | mv -f ~/domioclient/src/domio/*.js ${bundles_folder}/scripts

echo Scripts files copied!