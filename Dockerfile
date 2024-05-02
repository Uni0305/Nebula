FROM eclipse-temurin:17-jre AS java_provider
FROM node:20 AS runner

COPY --from=java_provider /opt/java /opt/java

ENV JAVA_EXECUTABLE=/opt/java/openjdk/bin/java
ENV ROOT=/etc/nebula
ENV BASE_URL=http://localhost:8080/
ENV HELIOS_DATA_FOLDER=/var/lib/helios

WORKDIR /usr/src/app
ADD . .

RUN npm install
RUN npm run build