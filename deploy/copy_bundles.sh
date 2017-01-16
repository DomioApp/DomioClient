#!/usr/bin/env bash
set -e

bundles_folder=/usr/local/domio_public/templates

echo Copying bundled files...

mkdir -p /usr/local/domio_client

rm -rf ${bundles_folder}
yes | mv -f ~/domiopublic/src/domio_public/templates ${bundles_folder}

echo Templates copied!