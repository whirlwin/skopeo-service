FROM fedora:27

RUN yum update --assumeyes \
    && yum install --assumeyes skopeo nodejs \
    && mkdir -p /deployments

WORKDIR /deployments

COPY app.js package.json /deployments/

CMD node app.js
