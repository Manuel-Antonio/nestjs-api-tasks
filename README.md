# 🎉 API Tasks

Este proyecto es una API desarrollada con NestJS, con MySQL como base de datos. A continuación, se detalla cómo instalar, configurar y ejecutar el proyecto.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (opcional, si quieres clonar el repositorio)

## 🏃‍♂️ Pasos para clonar e instalar app

1. Clona este repositorio a tu máquina local:
   ```bash
   git clone https://github.com/Manuel-Antonio/nestjs-api-tasks.git

2. Abre el proyecto en tu Visual Code

Visualizaras muchos archivos necesarios para el proyecto.

3. Ejecutar comando en terminal

A continuación, abre la terminal integrada en Visual Studio Code para ejecutar el siguiente comando. Puedes abrir la terminal utilizando el atajo de teclado "Ctrl + ñ" en Windows o "Ctrl + ~" en macOS. Una vez abierta, ingresa el comando para construir y levantar los contenedores Docker.

* La instalacion dura 5 min aprox. depende del internet.
   ```bash
   docker-compose up --build

4. Verificar en la interfaz de Docker la creacion del contenedor "to_do_list", dentro de este se encontrará los contenedores:
- mysql
- nestjs_app

## 🖥 Pasos para usar el proyecto
1. Ejecuta tu docker creado si todavía no lo está. Luego en el navegador pega el link:
   ```bash
   http://localhost:3000/api
Verás que se abre un panel Swagger con los endpoints usados y documentados.

2. 🎉🎉🎉 Listo ya puedes usar la API, guiate de la documentación que dejé y te irá bien.
