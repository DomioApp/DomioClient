#!/usr/bin/env bash
set -e

bundles_folder=/usr/local/domio_client/

echo Copying scripts files...

mkdir -p ${bundles_folder}

rm -rf ${bundles_folder}/scripts

yes | mv -f ~/domiopublic/src/domio/scripts ${bundles_folder}

echo Scripts files copied!