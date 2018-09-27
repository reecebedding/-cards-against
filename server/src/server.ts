import * as path from "path";
import * as express from "express";
import * as GameLogic from "./controllers/sockets/gameLogic";

const app = express();
const server = require('http').Server(app);
const socket_server = require("socket.io")(server);

let port = 5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port);

GameLogic.InitListeners(socket_server);