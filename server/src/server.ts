import * as path from "path";
import * as express from "express";
import { Server } from "socket.io";
import { SocketManager } from "./controllers/sockets/socketManager";

const app = express();
const server = require('http').Server(app);
const socket_server: Server = require("socket.io")(server);

let port = 5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port);

SocketManager.initListeners(socket_server);