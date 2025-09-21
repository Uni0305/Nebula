FROM eclipse-temurin:21-jre AS java_provider
FROM node:22 AS runner

COPY --from=java_provider /opt/java /opt/java

ENV JAVA_EXECUTABLE=/opt/java/openjdk/bin/java
ENV ROOT=/etc/nebula
ENV BASE_URL=http://localhost:8080/
ENV HELIOS_DATA_FOLDER=/var/lib/helios

USER 1000:1000
WORKDIR /usr/src/app
ADD . .

RUN npm install
RUN npm run build