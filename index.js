require('dotenv').config();

const PORT = 3000;
const express = require('express');
const server = express();

const { client } = require('./db');
client.connect();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});


const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

const apiRouter = require('./api');
server.use('/api', apiRouter);
server.get("/", async (req, res) => {
  res.send({
    message:
      'Change the url to api/posts, api/users or api/tags'
  });
});   