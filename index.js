require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const socketIO = require("socket.io");

app.use("/lazer", express.static(path.join(__dirname, "public")));
app.use("/trabalho", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("redirect");
})

const server = app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server running..");
})

const messages = {lazer: [], trabalho: []};

const io = socketIO(server);

const lazer = io.of("/lazer").on("connection", (socket)=>{ // O 'of' permite que crie uma nova 'sala'. Esta sala vai ser chamada lá pelo FRONT: . OBS: este '/lazer' não tem ligação DIRETA com a linha 6. Tem ligação com a chamativa do FRONT em: 'const socket = io(`http://localhost:3000${room}`);'.
    console.log("New connection");

    socket.emit("messages", messages.lazer);

    socket.on("new-message", (data)=>{
        messages.lazer.push(data);
        lazer.emit("messages", messages.lazer) //Agora é o 'lazer' que irá emitir para TODOS os usuários o array - 'messages.lazer'
    })
})

const trabalho = io.of("/trabalho").on("connection", (socket)=>{ // O 'of' permite que crie uma nova 'sala'. Esta sala vai ser chamada lá pelo FRONT: 
    console.log("New connection");

    socket.emit("messages", messages.trabalho);

    socket.on("new-message", (data)=>{
        messages.trabalho.push(data);
        trabalho.emit("messages", messages.trabalho) //Agora é o 'trabalho' que irá emitir para TODOS os usuários o array - 'messages.trabalho'
    })
})

/* io.on("connection", (socket)=>{ //
    console.log("New connection");

    socket.emit("messages", messages); //enviado para TODOS os FRONTs ao entrar no chat

    socket.on("new-message", (data)=>{
        messages.push(data); //mandando a nova mensagem para o array de mensagens(messages). Como colocou somente 'data', ele manda tudo que tem nele, no caso, o user e o msg
        io.emit("messages", messages) //enviando para TODOS OS FRONTs, o array de mensagens
    })
}) */