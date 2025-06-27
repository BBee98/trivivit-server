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

2. Necesitaremos usar algunos aspectos de ``node``. Recomendable instalar los tipos para no tener problemas:

```shell
npm i --save-dev @types/node
```

3. ``Dotenv`` para las variables de entorno:

```shell
npm i dotenv
```

#### Script

Añade al ``package.json``:

```
{
  "name": "trivivit-server",
  "version": "0.0.0",
  "main": "src/main.ts",
  "scripts": {
    "test": "test",
    "build": "npx tsc",
    "watch": "npx tsc --watch",
    "start": "npm run build && node dist/main"
  },
  ...
}

```

El más importante es ``"start": "npm run build && node dist/main"``, el cual nos permite compilar el
código de ``typescript`` a ``javascript``para poder levantar el servidor de ``fastify``.

🔔 Recuerda generar el fichero ``tsconfig.json`` para poder compilar. Puedes utilizar esta configuración:

tsconfig.json

```json
{
  "include": ["./src/**/*"],
  "exclude": ["node_modules"],
  "compilerOptions": {
    "target": "ESNext",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```