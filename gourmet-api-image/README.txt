docker build -t gourmet-api:v1 .
docker images

# Crear contenedor
docker run -p 8080:8080 --name gourmet-api -d gourmet-api:v1

# Creación del jar. Dentro del director gourmet-api del workspace ejecutar:
.\mvnw clean package -DskipTests




# Others configurations
spring.datasource.url=jdbc:mysql://${DB_SERVER:localhost}:${DB_PORT:3306}/nms_app?createDatabaseIfNotExist=true
spring.datasource.platform=mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=xxx
spring.datasource.password=xxx
spring.datasource.initialization-mode=always

spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.show_sql=false
spring.jpa.properties.hibernate.use_sql_comments=false
spring.jpa.properties.hibernate.format_sql=false

https://stackoverflow.com/questions/56340537/docker-springboot-and-mysql-com-mysql-cj-exceptions-cjcommunicationsexception

https://www.hellojava.com/a/51263.html

https://medium.com/@tariqul.islam.rony/spring-boot-and-multi-stage-dockerized-image-with-mysql-in-docker-compose-part-3-2999b2bdf6aa

https://stackoverflow.com/questions/56340537/docker-springboot-and-mysql-com-mysql-cj-exceptions-cjcommunicationsexception