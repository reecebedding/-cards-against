const bodyParser = require("body-parser");
const path = require("path");

const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

let port = 5000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes'));

server.listen(port);

io.on('connection', function(socket){
	console.log('New Connection');
});