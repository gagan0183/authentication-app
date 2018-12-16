#!/usr/bin/env bash

set -e

: "${HEROKU_API_KEY?"HEROKU_API_KEY is not set"}"
: "${HEROKU_ACCOUNT_EMAIL?"HEROKU_ACCOUNT_EMAIL is not set"}"
: "${HEROKU_REGISTRY_IMAGE?"CI_REGISTRY_IMAGE is not set"}"
: "${CI_COMMIT_REF_SLUG?"CI_COMMIT_REF_SLUG is not set"}"
: "${IMAGE_VERSION?"IMAGE_VERSION is not set"}"


docker login --username="${HEROKU_ACCOUNT_EMAIL}" --password="${HEROKU_API_KEY}" registry.heroku.com
export DOCKER_REPO="${HEROKU_REGISTRY_IMAGE}/${HEROKU_APP}:${IMAGE_VERSION}" && echo "${DOCKER_REPO}"
docker build -t "${DOCKER_REPO}" .
docker push "${DOCKER_REPO}"
docker run --rm -e HEROKU_API_KEY="${HEROKU_API_KEY}" wingrunr21/alpine-heroku-cli  container:release "${IMAGE_VERSION}" --app="${HEROKU_APP}"