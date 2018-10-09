require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const deployVersion = (new Date()).getTime();

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('./public'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  app.locals.deployVersion = deployVersion;

  next();
});

app.set('view engine', 'ejs');

app.get('*', (req, res) => res.render(path.join(__dirname, 'resources/views', 'index.ejs'), {
  isDevelopment: process.env.NODE_ENV === 'development',
  apiUrl: process.env.API_URL,
}));

server.listen(process.env.PORT);

console.log(`server started on port ${process.env.PORT}`);
