import express from 'express'
import { createServer } from 'http';
import { Server } from 'socket.io'

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.get('/home', (req, res) => {
  return res.status(200).send('<h1>Node and Nginx on Docker Online</h1>')
});

io.on('connection', (socket) => {
  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      username: socket.id,
      message: data
    });
  });
});

server.listen(process.env.WEBAPP_PORT || 3000, () => {
  console.info('Web application is listening on port 3000');
});
