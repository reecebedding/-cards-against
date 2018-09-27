import { Socket } from "socket.io";
import * as path from "path";
import * as express from "express";

const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

let port = 5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port);

io.on('connection', function(socket: Socket){
	console.log('New Connection');
});