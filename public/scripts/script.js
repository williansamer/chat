const room  = window.location.pathname.replace(/\//g, ''); // O  'replace(/\//g, '')' irá substituir TUDO que for /(barra) por 'vazio'. A leitura do regex é: O Barra(/) irá mostrar o começo e o final de uma string. O '\/' irá informar a string que deseja(no caso, usou a barra contrária para dar certo, senão ficaria como comentário), é por fim o 'g' para usar de forma global
//console.log(room);
const socket = io(`https://chat-willian.herokuapp.com/${room}`); //conectando com o BACK(com as respectivas salas)

socket.on("messages", (messages)=>{ //Recebendo do BACK, o array de mensagens(messages)
    insertMessagesOnMural(messages); //enviando como arg o 'messages'
})

let user = null;

function insertMessagesOnMural(messages){
    let list_messages = "<ul>";

    messages.forEach((message)=>{
        list_messages += `<li>${message.user}_____: ${message.msg}</li>`; //Definindo no li o user e o msg
    })
    list_messages +="</ul>";

    document.querySelector("#messages").innerHTML = list_messages;
}

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("#fmn"); //criando uma const do formulário(form)
    form.addEventListener("submit", function(e){ //criando um evento(addEventListener) dentro do form. O 'e' é referente ao evento
        e.preventDefault(); //não deixa(evita) o evento(e) usar o seu comportamento padrão. Desviando, assim, o foco do comportamento do evento para outra direção
        if(!user){ //Se o 'user' for vazio(null)..
            alert("Defina o nome para continuar"); //alert
            return; //Para a leitura
        }
        let inpMessage = document.forms["form-message-name"]["input-message"].value;//Pegando o valor(value) do input. OBS. ["form-message-name"] e ["input-message"], é referente ao 'name' colocado lá no index.html. É uma outra forma de pegar os dados do input, ao invés de usar o 'querySelector'
        document.forms["form-message-name"]["input-message"].value = '';
        if(!inpMessage == ''){//Se o campo do input não for vazio, faça..
            socket.emit("new-message", {user: user, msg: inpMessage}); //Enviando para o BACK, o user e a msg do input pelo caminho do 'new-message'
        }
    })

    const userForm = document.querySelector("#umn");
    userForm.addEventListener("submit", function(e){
        e.preventDefault();
        user = document.forms["user-message-name"]["input-user"].value;
        userForm.parentNode.removeChild(userForm); //Removendo o form. Pega o 'pai' do form como referência e exclui o filho, ou seja, ele próprio.
    })
})