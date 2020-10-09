import ejs from "ejs";
import express from 'express';
import { MongoConnect } from './mongo';

//const mongoose = require('mongoose');
MongoConnect.cnctDB("MarksismVoice")
const app = express()
const port = 3000

const clientdir = __dirname.substr(0, __dirname.length - 4) + "/client"

app.use(express.static(clientdir))

app.get('/', (req, res) => res.render("pages/index.ejs"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))