const express = require('express')
require('dotenv').config()
const ws = require('ws')

const app = express()
app.use(express.json())
app.use(express.static("public"));

app.post("/",async (req,res) => {
   if (!req.body.passcode || req.body.passcode != process.env.PASSCODE) {
      res.status(401).json({message: "That passcode is incorrect."})
   } else if (!req.body.invite) {
      res.status(400).json({message: "No invitation was sent."})
   } else {
//      console.log("invitation: ", req.body.invite)
      const client = new ws(process.env.CONNECT_URL);
      client.on('error', (e) => console.log("ws error:", e))
      client.on('open', () => {
        client.send(JSON.stringify({action: 'sendmessage', 
        data: req.body.invite}));
        res.status(200).json({message: "The invitation has been sent to Mom."})
        client.close()
      })
   }
})

const port = process.env.PORT || 5000;

  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }


