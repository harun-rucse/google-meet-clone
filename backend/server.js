const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, './.env'),
});
const express = require('express');
const http = require('http');
const cors = require('cors');
const router = require('./routes');
const socketManager = require('./socketManager');

const app = express();
app.enable('trust proxy');
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

app.use(router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build/')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend/build/index.html'));
  });
}

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
io.on('connection', socketManager);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
