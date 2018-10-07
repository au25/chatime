const msgTypes = {LEFT: 'left', RIGHT: 'right', LOGIN: 'login'}

//Chat
const chatContainer = document.getElementById('chat-container');
const msgContainer = document.getElementById('msg-container');
const msgInput = document.getElementById('msgInput');
const chatButton = document.getElementById('send-button');
const msgForm = document.getElementById('msg-form');

//user login
let username = '';
const loginForm = document.getElementById('login');
const loginContainer = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const loginButton = document.getElementById('login-button');

//connect to socket
var socket = io();

socket.on('message', msg => {
    console.log(msg);
    if (msg.type !== msgTypes.LOGIN){
        if(msg.author === username){
            msg.type = msgTypes.RIGHT;
        }
        else {
            msg.type = msgTypes.LEFT;
        }
    }

    msgs.push(msg);
    displayMsg();
    chatContainer.scrollTop = chatContainer.scrollHeight;
})

//Message
const msgs = [
];

createMsgHTML = msg => {
    if(msg.type === msgTypes.LOGIN){
        return `
            <p class="online-text">${msg.author} just came online!</p>
        `;
    }

    return `
        <div class="msg ${msg.type === msgTypes.LEFT ? 'msg-left' : 'msg-right'}">
            <div class="msg-info ${msg.type === msgTypes.LEFT ? 'msg-info-left' : 'msg-info-right'}">
                <p class="msg-user">
                ${msg.type === msgTypes.RIGHT ? '' : msg.author}</p>
                <p class="date">${msg.date}</p>
            </div>
            <p class=${msg.type === msgTypes.LEFT ? 'content-left' : 'content-right'}>
                ${msg.content}
            </p>
         </div>
    `;
}

const displayMsg = () => {
    const msgHTML = msgs.map( msgs => createMsgHTML(msgs)).join('');
    msgContainer.innerHTML = msgHTML;
}

displayMsg();

//chatButton callback
msgForm.addEventListener('submit', e => {
    e.preventDefault();

    if(!msgInput.value){
        //add event if msg input is empty?/
    }

    const date = new Date();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    const dateString = `${hour}:${minute} ${ampm}`;

    if(msgInput.value){

        const msg = {
            author: username,
            date: dateString,
            content: msgInput.value,
            // type: msgTypes.RIGHT
        }

        sendMessage(msg);
        msgInput.value = '';

    }
})

const sendMessage = msg => {
    socket.emit('message', msg);
}

//loginButton callback
loginForm.addEventListener('submit', e => {
    //stops form refresh
    e.preventDefault();

    //prevents empty login
    if(!usernameInput.value){
        alert("Please enter a username.");
    }

    //assign username and log online user
    if(usernameInput.value){

        username = usernameInput.value;

        sendMessage({
            author: username,
            type: msgTypes.LOGIN
        });

        //hide login form and show chat
        loginContainer.classList.remove('flex');
        loginContainer.classList.add('hidden');
        loginForm.classList.remove('flex');
        loginForm.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        chatContainer.classList.add('flex');  
    }
});