import ejs from "ejs";
import express from 'express';
import mongo from 'mongoose';
const Stream = require('stream')
import { MongoConnect } from './mongo';
var eescape = require('escape-html');

//const readableStream = new Stream.Readable()

//readableStream._read = () => {}

//const mongoose = require('mongoose');
MongoConnect.cnctDB("MarksismVoice")
const app = express()
const port = 3000

const clientdir = __dirname.substr(0, __dirname.length - 4) + "/client"

app.use(express.urlencoded({
    limit: "1mb",
    extended: true,
    parameterLimit: 50000
}))

const pmessageSchema = new mongo.Schema({
    message: String,
    date: Date
})

const messageDoc = mongo.model('message', pmessageSchema)

function createEntry(message: any) {
    let entry = new messageDoc({
        message: message,
        date: new Date()
    })
    return entry
}

app.use(express.static(clientdir))

app.get('/', (req, res) => res.redirect(307, '/get_chat'))

app.post('/post_chat', (req, res) => {
    console.log("Post")
    //readableStream.push("New data")
    MongoConnect.saveToDB(createEntry(req.body.message))
    res.send('<meta http-equiv="Refresh" content="0; url=\'/get_chat\'" />')
})

app.get('/get_chat', async (req, res) => {

    let messages = await MongoConnect.getCursor(messageDoc)

    //res.send(messages);

    //console.log(messages);

    res.render("pages/index.ejs", { messages: messages, eescape: eescape })
})

/*app.get('/update', (req, res) => {
    console.log("Got update request")

    readableStream.on('readable', () => {
        res.send("An update is availeble")
        console.log("Finished update request")
    });
});*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))