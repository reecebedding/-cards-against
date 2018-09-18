const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let port = 5000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});
