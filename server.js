const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const {PORT}=require('./config')
const app = express();

const server=app.listen(PORT);
try{
app.use(cors());
app.use(express.json());

const routes = require('./routes');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

}catch(err){
    server.close();
}


