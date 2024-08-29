//import { createServer } from 'node:http'

//const server = createServer((request, response) => {
//    console.log('hello world')

//    return response.end()
//})

//server.listen(3333)

import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const {tittle, description, duration} = request.body


    await database.create({
        title: tittle,
        description: description,
        duration: duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search
    console.log(search)
    const videos =  await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {tittle, description, duration} = request.body


    const video =  await database.update(videoId, {
        title: tittle,
        description: description,
        duration: duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async(request, reply) => {
    const videoId = request.params.id 

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT,
})