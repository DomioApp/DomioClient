#!/usr/bin/env bash
set -e

bundles_folder=/usr/local/domio_client/scripts

echo Copying scripts files...

mkdir -p ${bundles_folder}

rm -rf ${bundles_folder}

yes | mv -f ~/domioclient/src/domio ${bundles_folder}

echo Scripts files copied!