FROM mysql:8.0.1

ENV MYSQL_DATABASE=db_gourmet
ENV MYSQL_ROOT_PASSWORD=admin
	
ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306