const express = require('express');
const app = express();
const port = 8080;

const db = require('./config/mongoose')

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Successfully running on port : ${port}`)
})