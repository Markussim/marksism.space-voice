import ejs from "ejs";
import express from 'express';
import mongo from 'mongoose';
import { MongoConnect } from './mongo';

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

function createEntry(message: any){
    let entry = new messageDoc({
        message: message,
        date: new Date()
       })
       return entry
}

app.use(express.static(clientdir))

app.get('/', (req, res) => res.redirect(307, '/chat'))

app.post('/chat', async (req, res) =>  {
    MongoConnect.saveToDB(createEntry(req.body.message))
    res.redirect('/chat')
})

app.get('/chat', async (req, res) => {

    let messages = await MongoConnect.getCursor(messageDoc)

    //res.send(messages);

    console.log(messages);
    
    res.render("pages/index.ejs", {messages: messages})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))