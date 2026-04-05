FROM eclipse-temurin:21-jre AS java_provider
FROM node:22 AS runner

ENV UID=1000 \
    GID=1000 \
    JAVA_EXECUTABLE=/opt/java/openjdk/bin/java \
    ROOT=/etc/nebula \
    BASE_URL=http://localhost:8080/ \
    HELIOS_DATA_FOLDER=/var/lib/helios

COPY --from=java_provider /opt/java /opt/java

USER ${UID}:${GID}
WORKDIR /usr/src/app
ADD --chown=${UID}:${GID} . .

RUN npm install
RUN npm run build
ENTRYPOINT [ "npm", "run", "faststart" ]