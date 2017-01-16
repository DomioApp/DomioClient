#!/usr/bin/env bash
set -e

templates_folder=/usr/local/domio_public/templates

echo Copying templates folder...

mkdir -p /usr/local/domio_public

rm -rf ${templates_folder}
yes | mv -f ~/domiopublic/src/domio_public/templates ${templates_folder}

echo Templates copied!