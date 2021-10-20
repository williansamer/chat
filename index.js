const express = require("express");
const app = express();
const path = require("path");
const socketIO = require("socket.io");

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(3000, ()=>{
    console.log("Server running..");
})