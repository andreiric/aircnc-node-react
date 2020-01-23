import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import * as cors from 'cors';
import * as path from 'path';
import * as socketio from 'socket.io';
import { Server } from 'http';

import routes from './routes';

createConnection().then(() => {
  const app = express();
  const server = new Server(app);
  const io = socketio(server);

  const connectedUsers = {};

  io.on('connection', (socket: any) => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
  });

  app.use((req, res, next) => {
    req.push(io);
    req.push(connectedUsers);

    return next();
  });

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')));
  app.use(routes);

  server.listen(3333);
}).catch(error => console.error(error));
