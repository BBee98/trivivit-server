# Introducción

## ¿Qué es trivivit-server?

Trivivit server es una **API** que servirá preguntas de **trivia** recogidas, a su vez, de otra **API** llamada `OpenTrivia`.

```
🌍 https://opentdb.com/api_config.php
```
## Objetivo del proyecto

Esto se trata de un ``pet project``, por lo que el objetivo principal es **aprender a crear APIs**.

## Características del proyecto

### Framework

El framework utilizado será ``fastify``:

```
🚧 https://fastify.dev/
```

### Arquitectura

Se usará una ``Featured-based architecture``:

```
🏛️ https://dev.to/naserrasouli/scalable-react-projects-with-feature-based-architecture-117c#:~:text=Feature%2DBased%20Architecture%20is%20an,utils%2F%20at%20the%20top%20level.
```

### Lo básico:

#### NPM

1. El proyecto está hecho en `typescript`, así que no olvides instalarlo:

```shell
npm install typescript
```

2. Para compilarlo, en lugar de la herramienta nativa de Typescript (``tsc``) vamos a usar ``tsup``:

🌏 https://github.com/egoist/tsup

En este otro link existe una información más **completa** con ``flags`` que puedes añadir para personalizar el transpilado:

👉 https://tsup.egoist.dev/#install

Para instalar ``tsup``, escribe en la terminal:

```
npm install --save-dev tsup
```

````
🚨En la documentación, puede leerse:

By default tsup bundles all import-ed modules but dependencies 
and peerDependencies in your package.json are always excluded, 
you can also use --external <module|pkgJson> flag to mark other packages or other special package.json's 
dependencies and peerDependencies as external.

Es decir, que **todas las dependencias del package.json que se encuentren dentro de esos dos sitios no se incluirán en el transpilado**.
````

🔗 Para ver el ``script`` que vamos a usar para el transpilado, _leer la sección de Scripts_.



3. Necesitaremos usar algunos aspectos de ``node``. Recomendable instalar los tipos para no tener problemas:

```shell
npm i --save-dev @types/node
```

4. ``Dotenv`` para las variables de entorno:

```shell
npm i dotenv
```

🌏 https://www.npmjs.com/package/dotenv

#### Script

Añade al ``package.json``:

```
{
  "name": "trivivit-server",
  "version": "0.0.0",
  "main": "src/server.ts",
  "scripts": {
    "test": "test",
    "clean": "rm -rf dist",
    "build": "npm run clean && tsup-node src/core/server.ts dist/server.js --minify",
    "watch": "npx tsc --watch",
    "start": "npm run build && node dist/server.js"
  },
  ...
}

```

🚨 En el punto anterior dijimos que **todas las dependencies y peerDependencies del package.json serían excluidas por el propio tsup**, pero dado que **es posible que algunas
de esas dependencias no sean excluidas**, vamos a utilizar la opción ``tsup-node`` para asegurarnos de que, efectivamente, **todas** sean excluidas (👉 leer más en https://tsup.egoist.dev/#excluding-all-packages).

🚨 Además, vamos a añadir la opción ``--minify`` para reducir el tamaño (👉 leer más en https://tsup.egoist.dev/#minify-output)

El más importante es ``"start": "npm run build && node dist/main"``, el cual nos permite compilar el
código de ``typescript`` a ``javascript``para poder levantar el servidor de ``fastify``.

🔔 Recuerda que, como vamos a usar ``tsup`` el fichero ``tsconfig.json`` **no es necesario**, así que no hace falta generarlo. En caso de querer tener más opciones para ``tsup``, puedes generar
su propio fichero de configuración (👉 leer más en https://tsup.egoist.dev/#using-custom-configuration)
