const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// add routes Handler
const messageHandler = require('./routes/messages');

const app = express();
// for parsing application json
app.use(cors());
// for parsing application/xwww-/form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//serves content in the public folder
app.use(express.static(path.join(__dirname, 'public')));
// add endpoint handler
app.use('/messages', messageHandler);

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
