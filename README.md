# Prueba CentralFile FrontEnd

Breve descripción o introducción.

## Requisitos previos

Asegúrate de tener Node.js instalado en tu sistema. Puedes descargar la última versión estable de Node.js desde [el sitio oficial](https://nodejs.org/).

## Instalación

Clona este repositorio utilizando el siguiente comando:

```bash
git clone https://github.com/ronny-minda/PruebaCliente
```

## Accede al directorio del proyecto:

```bash
cd PruebaCliente
```

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

```bash
VITE_API_BACK=http://localhost:5000/api/
```

Asegúrate de que el archivo .env contenga la variable VITE_API_BACK antes de continuar. Esta variable se utilizará para configurar la URL de la API del backend en la aplicación.

Instala las dependencias del proyecto ejecutando:

```bash
npm install
```

## Uso

Para iniciar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo y abrirá automáticamente la aplicación en tu navegador en la dirección http://localhost:5173.

## Compilación para producción

Para compilar la aplicación para producción, ejecuta:

```bash
npm run build
```

Este comando generará una carpeta dist con los archivos optimizados listos para ser desplegados en un servidor web.

## Para el inicio de sesion en la aplicacion es

```bash
usuario: admin@gmail.com
contraseña: 123
```
