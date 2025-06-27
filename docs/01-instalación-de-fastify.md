# Instalación

Desde la raíz del proyecto, escribe en la terminal 👩🏼‍💻:

``
npm install fastify
``

Nota: Puedes ver la documentación aquí: 👉https://fastify.dev/ 👈

Crea un fichero llamado ``main.ts`` dentro del directorio ``src`` y pega el siguiente código:

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
async function run(){
    try {
        await fastify.listen({port: 3000})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
````