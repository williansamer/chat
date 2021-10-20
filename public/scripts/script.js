const socket = io("http://localhost:3000");

socket.on("messages", (messages)=>{
    insertMessagesOnMural(messages);
})

function insertMessagesOnMural(messages){
    let div_messages = "<ul>";

    messages.forEach((message)=>{
        div_messages += `<li>${message}</li>`;
    })
    div_messages +="</ul>";

    document.querySelector("#messages").innerHTML = div_messages;
}

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("#fmn");
    form.addEventListener("submit", function(e){
        e.preventDefault();
        let inpMessage = document.forms["form-message-name"]["input-message"].value;
        document.forms["form-message-name"]["input-message"].value = '';
        if(!inpMessage == ''){
            socket.emit("new-message", {msg: inpMessage});
        }
    })
})