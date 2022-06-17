class Message {
  id;
  from;
  text;
  timestamp;
  constructor(id, from, text) {
    this.id = id;
    this.from = from;
    this.text = text;
    this.timestamp = Date.now();
  }
}
// export { Message };
module.exports = Message;
