#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
while [[ -h "${SOURCE}" ]]; do # resolve ${SOURCE} until the file is no longer a symlink
    DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"
    SOURCE="$(readlink "${SOURCE}")"
    [[ ${SOURCE} != /* ]] && SOURCE="${DIR}/${SOURCE}" # if ${SOURCE} was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
CURRENT_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

cd "${CURRENT_DIR}"

ARG="$1"
if [[ "${ARG}" == "--dev" ]];then
  IS_DEV_MODE="TRUE"
fi
if [[ "${ARG}" == "--npm-publish" ]];then
  PUBLISH_TO_NPM="TRUE"
fi


rm -r ./app
rm -r ./dist
rm -r ./publish

if [[ "${IS_DEV_MODE}" == "TRUE" ]]; then
    ./node_modules/webpack/bin/webpack.js --mode development
else
    ./node_modules/webpack/bin/webpack.js
fi

cp -r ./static/* ./app/

if [[ "${PUBLISH_TO_NPM}" == "TRUE" ]]; then
    mkdir -p publish
    cd publish
    cp "${CURRENT_DIR}/package.json" .
    cp "${CURRENT_DIR}/README.md" .
    cp "${CURRENT_DIR}/dist/retro-speech.module.min.js" .
    npm publish
fi