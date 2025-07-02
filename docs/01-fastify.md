# Instalación

Desde la raíz del proyecto, escribe en la terminal 👩🏼‍💻:

``
npm install fastify
``

Nota: Puedes ver la documentación aquí: 👉https://fastify.dev/ 👈

Crea un fichero llamado ``server.ts`` dentro del directorio ``src`` y pega el siguiente código:

````typescript

// Import the framework and instantiate it
import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/', async function handler(request, reply) {
    return {hello: 'world'}
})

// Run the server!
async function run() {
    try {
        await fastify.listen({port: 3000})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
````

Ahora, si levantamos el servidor con ``npm run start``, veremos que se escucha el puerto 3000, y si navegamos a
``localhost:3000`` aparecerá en la consola ``world``.

‼️ Recuerda que para que el script ``npm run start`` funcione, hemos debido de transpilar anteriormente el código de
typescript
a javascript. Si nuestro **package.json** luce así:

```json
{
  "scripts": {
    "test": "test",
    "clean": "rm -rf dist",
    "build": "npm run clean && tsup-node src/core/server.ts dist/server.js --minify",
    "watch": "npx tsc --watch",
    "start": "npm run build && node dist/server.js"
  }
}
```

Cuando hagamos ``npm run start``, transpilaremos el código automáticamente con ``npm run build``.

## Definiendo el fichero de rutas

Como especificamos en el `ìndex.md`, vamos a hacer una arquitectura `featured-based`. Vamos a crear la siguiente
estructura de ficheros:

```
├── src/
    ├── features/
        └─────────/question
                    └─────────/handlers
                    └─────────/interfaces
                    └─────────/routes
```

Siendo ``question`` el nombre de la ``feature`` sobre la que vamos a trabajar.
Por tanto dentro de la carpeta ``question``, creamos el fichero ``routes`` y, dentro, ``question.routes.ts``.

### El método ``register``

Una de las cosas que nos permite hacer fastify es **registrar** rutas. Esto es muy útil en los casos donde necesitamos
establecer un **prefijo** fijo
para todas las rutas que queremos. Pero no solo eso, podemos hacer **múltiples registros** dentro del registro matriz (
por saí llamarlo). Un ejemplo:

```typescript
fastify.register((app, _, done) => {
    app.register((app, _, done) => {

    }, {prefix: '/questions'})
}, {prefix: '/v1'})
```

En el primer ``register``, registramos la versión de la ruta (útil y recomendable para evitar futuros quebraderos de
cabeza), y en la siguiente
registramos el prefijo que queremos que tengan todas las rutas comprendidas **dentro** de esta, que será ``/questions``.

Para **desarrollar** lo que es **la ruta en sí**, usamos otro fichero llamado ``routes``, en el que exportaremos las
rutas.

### Definición de la ruta base de /questions: ``/``.

Creamos un fichero ``routes.ts`` dentro de la carpeta ``routes``. Nos queda una estructura así:

```
├── src/
    ├── features/
        └─────────/question
                    └─────────/handlers
                    └─────────/interfaces
                    └─────────/routes
                                └───/routes.ts
                                └───/question.routes.ts
```

Para definir una ruta, podemos usar dos posibles métodos: ``fastify.get`` o ``fastify.router``.

Definir ``route`` nos permite hacer cosas más complejas:

👉 🌍 https://fastify.dev/docs/latest/Reference/Routes/#full-declaration

```
fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
```

1. Definir el ``schema`` de la petición, que contiene cosas como:

a) Los **parámetros**:

```
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
      }
    }
```

Indica que el parámetro debe de ser de tipo `Object` con las propiedades ``name`` y `excitement`.

2. Las responses que puede devolver (Status codes), así como lo que se **devuelve** en esa response.

3. El ``handler``, que es **el cuerpo de lo que la request va a ejecutar**:

4. El ``preHandler`` (que no aparece): que es el **middleware** de la petición.

Pero en este caso usaremos ``get`` al tratarse de una petición sencilla.

#### Extra: Zod

Para evitar repetir el código de manera innecesaria (DRY), vamos a utilizar un ``package`` que nos permite
crear **validaciones de schemas** y que está **basado en typescript**.

🌍https://www.npmjs.com/package/zod

### Definición de las propiedades del response

Como hemos instalado ``zod``, vamos a definir un schema **dentro** de la carpeta `interfaces` dentro de ``question``:

```
├── src/
    ├── features/
        └─────────/question
                    └─────────/handlers
                    └─────────/interfaces
                                └───/question.schema.ts
                    └─────────/routes
                                └───/routes.ts
                                └───/question.routes.ts
```

En el fichero ``question.schema.ts`` creamos un objeto llamado ``QuestionSchema`` con la siguiente estructura:

````typescript
import {z} from "zod/v4";

export const Question = z.object({
    type: z.string(),
    difficulty: z.string(),
    category: z.string(),
    question: z.string(),
    correct_answer: z.string(),
    incorrect_answers: z.array(z.string())
})

export const QuestionSchema = {
    response_code: z.number(),
    results: z.array(Question)
}
````

📝 Nota: el nombre de los parámetros que debemos usar los hemos obtenido de acudir a la página **quicktype.io**
( 🌍 https://app.quicktype.io/ ) y de introducir un ejemplo de respuesta obtenida
al hacer una llamada al siguiente endpoint: https://opentdb.com/api.php?amount=10&category=15&type=boolean&encode=base64

🗣️ Ejemplo de respuesta obtenida

````json
{
  "response_code": 0,
  "results": [
    {
      "type": "Ym9vbGVhbg==",
      "difficulty": "ZWFzeQ==",
      "category": "RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=",
      "question": "TWluZWNyYWZ0IGNhbiBiZSBwbGF5ZWQgd2l0aCBhIHZpcnR1YWwgcmVhbGl0eSBoZWFkc2V0Lg==",
      "correct_answer": "VHJ1ZQ==",
      "incorrect_answers": [
        "RmFsc2U="
      ]
    }
  ]
}
````

La constante que creamos anteriormente (``QuestionSchema``) la usamos en el ``schema`` de la definición
de la llamada que estábamos creando para indicar qué objetos contendrá:

````typescript
const HttpGetBaseUrl = (app: FastifyInstance) =>
    app.get('/', {
        schema: {
            response: {
                200: QuestionSchema,
            },
        }
    }, (_, reply) => GetQuestionsHandler(reply))

````

#### ¿Cómo es la definición de un ``schema`` en Fastify?

Tanto en los casos en que usemos ``.get`` (o los otros métodos ``PUT``, ``POST``, etc.) como en los que usemos
``.route``, una de las cosas que **debemos definir** es el objeto ``schema``.

Dentro del ``schema`` podemos especificar distintas propiedades.

Puedes verlas todas aquí 👉 https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#validation

Por ejemplo, en nuestra api, una de las cosas que hemos definido es el ``response``.

En el ``response`` debemos especificar **qué códigos http** podemos devolver y **qué contiene** cada uno.

````
  schema: {
    response: {
      200: QuestionSchema,
    },
  }
````

Aquí estamos definiendo que, en caso de que todo haya ido `OK`, devolveremos un código `200` que contendrá
un objeto con las propiedades definidas en ``QuestionSchema`` (que hicimos con ayuda de ``zod``). En este caso, es un
objeto que tiene, principalmente,
un ``response_code`` con, a su vez, el código de respuesta de la llamada a la API externa que vamos a usar, y
``results``, que es un `array` que contiene
el resultado de la petición.

#### El cuerpo de la llamada: el ``handler``

El ``handler`` es la función que se ejecutará al hacer la llamada al endpoint. En este caso, hemos creado la función
``GetQuestionsHandler`` dentro de la carpeta ``handler`` que creamos anteriormente:

```
├── src/
    ├── features/
        └─────────/question
                    └─────────/handlers
                                └───/question.handlers.ts
                    └─────────/interfaces
                                └───/question.schema.ts
                    └─────────/routes
                                └───/routes.ts
                                └───/question.routes.ts
```


```typescript

import {FastifyReply} from "fastify";

export async function GetQuestionsHandler(reply: FastifyReply) {

    const baseUrl = process.env.TRIVIA_API_URL;

    const url = `${baseUrl}?amount=10&category=15&type=boolean&encode=base64`;

    try {
        const response = await fetch(url)
        const body = await response.json();
        reply.send(body);

    } catch (error){
        return error;
    }
}
```