/*const express = require('express')
const path = require('path')*/
//const posts = require('./routes/posts')
import express, { urlencoded } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import posts from './routes/posts.js'
import errorHandler from './middleware/error.js'
import logger from './middleware/logger.js'
import notFound from './middleware/notFound.js'

const app = express()
const PORT = process.env.PORT || 8000

//Get directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'))
})
*/

//Body Parser
app.use(express.json())
app.use(urlencoded({extended: false}))

//Logger Middleware
app.use(logger)


//Routes
app.use('/api/posts', posts)

// Unknown route
app.use(notFound)
//Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})