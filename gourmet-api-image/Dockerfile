FROM openjdk:11
VOLUME /tmp
ADD ./gourmet-api-0.0.1-SNAPSHOT.jar gourmet-api.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/gourmet-api.jar"]