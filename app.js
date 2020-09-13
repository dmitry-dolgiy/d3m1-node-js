const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/app/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => console.log('run project on: ' + PORT))
    } catch (e) {
        console.log(e)
    }
}
start()
