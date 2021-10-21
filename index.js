const express = require("express");
const app = express();
const path = require("path");
const socketIO = require("socket.io");

app.use("/", express.static(path.join(__dirname, "public")));

const server = app.listen(3000, ()=>{
    console.log("Server running..");
})

const messages = [];

const io = socketIO(server);

io.on("connection", (socket)=>{ //
    console.log("New connection");

    socket.emit("messages", messages); //enviado para TODOS os FRONTs ao entrar no chat

    socket.on("new-message", (data)=>{
        messages.push(data); //mandando a nova mensagem para o array de mensagens(messages)
        io.emit("messages", messages) //enviando para TODOS OS FRONTs, o array de mensagens
    })
})