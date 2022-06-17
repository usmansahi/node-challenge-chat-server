const express = require('express');
const router = express.Router();
const Message = require('../models/message.js');
// DataBase //
// const welcomeMessage = {
//   id: 0,
//   from: 'Bart',
//   text: 'Welcome to CYF chat system!',
// };
const welcomeMessage = new Message(0, 'Bart', 'welcome to CYF chat system');

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let availableId = 1;
//message
router.get('/', function (request, response) {
  response.send(messages);
});
//post message
router.post('/', function (request, response) {
  //sanitize the input field
  const { from, text } = request.body;
  const id = availableId++;
  const newMessage = new Message(id, from, text);
  if (!newMessage.from || !newMessage.text) {
    response.sendStatus(400);
    return;
  }
  messages.push(newMessage); //adding message to database
  response.sendStatus(201);

  router.get('/latest', (request, response) => {
    response.send(messages.slice(-10).reverse());
  });

  router.get('/search', (request, response) => {
    //assing to veriable the query parameter(text)
    const textFilter = request.query.text;
    console.log(textFilter);

    // filter database with #1
    const result = messages.filter((message) =>
      message.text.includes(textFilter)
    );

    if (!result.length) {
      response.sendStatus(404);
      return;
    }
    //return the filter result
    // validate if we found anything at all (404)
    response.send(result);
  });
});
module.exports = router;
