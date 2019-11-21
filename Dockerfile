FROM fedora:27

RUN yum update --assumeyes \
    && yum install --assumeyes skopeo nodejs

COPY *.js package.json ./

CMD node ./app.js
