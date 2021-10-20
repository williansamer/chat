const socket = io("http://localhost:3000"); //conectando com o BACK

socket.on("messages", (messages)=>{ //Recebendo do BACK, o array de mensagens(messages)
    insertMessagesOnMural(messages); //enviando como arg o 'messages'
})

function insertMessagesOnMural(messages){
    let list_messages = "<ul>";

    messages.forEach((message)=>{
        list_messages += `<li>${message}</li>`;
    })
    list_messages +="</ul>";

    document.querySelector("#messages").innerHTML = list_messages;
}

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("#fmn"); //criando uma const do formulário(form)
    form.addEventListener("submit", function(e){ //criando um evento(addEventListener) dentro do form. O 'e' é referente ao evento
        e.preventDefault(); //não deixa(evita) o evento(e) usar o seu comportamento padrão. Desviando, assim, o foco do comportamento do evento para outra direção
        let inpMessage = document.forms["form-message-name"]["input-message"].value;//Pegando o valor(value) do input. OBS. ["form-message-name"] e ["input-message"], é referente ao 'name' colocado lá no index.html. É uma outra forma de pegar os dados do input, ao invés de usar o 'querySelector'
        document.forms["form-message-name"]["input-message"].value = '';
        if(!inpMessage == ''){//Se o campo do input não for vazio, faça..
            socket.emit("new-message", {msg: inpMessage}); //Enviango para o BACK, a msg do input pelo caminho do 'new-message'
        }
    })
})