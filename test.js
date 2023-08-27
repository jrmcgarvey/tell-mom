const ws = require('ws');
require('dotenv').config()

const client = new ws(process.env.CONNECT_URL);

client.on('open', () => {
    console.log("got this far")
  // Causes the server to print "Hello"
  client.send('Hello');
});

client.on("message", message=> console.log(message.toString()))
