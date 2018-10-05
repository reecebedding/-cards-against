import * as path from "path";
import * as express from "express";
import * as socket from "socket.io";
import { SocketManager } from "./controllers/sockets/socketManager";
import { Server as HttpServer } from "http"


const app = express();
const server = new HttpServer(app);
const socket_server: socket.Server = socket(server);

let port = 5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port);

SocketManager.initListeners(socket_server);