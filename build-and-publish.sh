#!/usr/bin/env bash

docker build -t whirlwin/skopeo-service:latest . \
    && docker push whirlwin/skopeo-service:latest

