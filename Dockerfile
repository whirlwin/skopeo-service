FROM fedora:27

RUN microdnf \
          --enablerepo=rhel-7-server-rpms \
          --enablerepo=rhel-7-server-extras-rpms \
          --enablerepo=rhel-7-server-optional-rpms \
          install -y skopeo python

RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash - \
          && microdnf install nodejs

WORKDIR /deployments

COPY *.js package.json /deployments/

CMD node ./app.js
