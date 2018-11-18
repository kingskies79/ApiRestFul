const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./route');
const PORT = 3000;
const app = new express();

mongoose.connect('mongodb://kingskies79:Linux799@ds219130.mlab.com:19130/mydbmongo');
mongoose.connection.on('connected', ()=>{
    console.log("Mongodb is running");
})
mongoose.connection.on('error', (err)=>{
    console.log(err);
})

app.use(cors());
app.use(bodyParser.json());

app.use('/', route);
app.listen(PORT, ()=> {
    console.log('Server is started on port ' + PORT);
})