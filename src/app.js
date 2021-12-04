const express = require("express");
const cors = require("cors");
const { join } = require("path");
const { token, voiceResponse } = require("./helpers/twilio.helper");
const app = express();


// app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, "../public")))

app.get("/token", (req, res) => {
    res.send(token())
})

app.post("/voice", (req, res) => {
    res.set("Content-Type", "text/xml");
    console.log({body: req.body, headers: req.headers})
    const response = voiceResponse(req.body.To)
    console.log({response})
    res.send(response);
})

app.get("/", (req, res) => {
    
    res.sendFile("/index.html")
})

module.exports = app;