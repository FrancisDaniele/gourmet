docker build -t gourmet-db:v1 .

# Crear contenedor
docker run --name gourmet-db-mysql -d gourmet-db:v1

# Comprobaciones
docker logs -f gourmet-db-mysql
docker inspect gourmet-db-mysql
docker exec -it gourmet-db-mysql bash
    mysql -uroot -p
    show databases; 
    use db_gourmet;
    show tables;

# Pruebas Ejemplos
docker run --name gourmet-db-mysql-base  -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=db_gourmet -d mysql:8

# info
https://medium.com/better-programming/customize-your-mysql-database-in-docker-723ffd59d8fb


https://stackoverflow.com/questions/29145370/how-can-i-initialize-a-mysql-database-with-schema-in-a-docker-container