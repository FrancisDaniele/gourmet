docker build -t gourmet-web:v1 .
docker images

# Ejemplo arrancar nginx puerto 5500 a partir de la imagen 
 docker run --name docker-gourmet-web -d -p 5500:80 gourmet-web:v1


