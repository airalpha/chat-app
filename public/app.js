const messageTypes = {
    LEFT: 'left',
    RIGHT: 'right',
    LOGIN: 'login'
};

//Chat stuff
const chatWindow = document.getElementById('chat');
const messageList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

//Login stuff
let username = '';
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = []; // {author, date, content, type}

var socket = io();

socket.on('message', message => {
    console.log(message);
    if(message.type !== messageTypes.LOGIN) {
        if(message.author === username) {
            message.type = messageTypes.RIGHT;
        } else {
            message.type = messageTypes.LEFT;
        }
    }

    messages.push(message);
    console.log(messages);
    clearMessages();
    displayMessages();
});


//Take message and return the correct html result
const createMessageHTML = message => {
    if(message.type === messageTypes.LOGIN) {
        return `
            <p class="secondary-text text-center mb-2">${message.author} joined the chat</p>
        `;
    }

    return `
        <div class="message message-${message.type}">
            <div class="message-details flex">
                <p class="flex-grow-1 message-author">${message.type === 'right' ? '' : message.author}</p>
                <p class="message-date">${message.date}</p>
            </div>
            <p class="message-content">${message.content}</p>
        </div>
    `;
};

//Display message in messageList
const displayMessages = () => {
    messageList.innerHTML = messages
        .map(message => createMessageHTML(message))
        .join('');
};

//Clear message
const clearMessages = () => {
    messageList.innerHTML = '';
};

//Call function displaymessage
displayMessages();

//Login button callback
loginBtn.addEventListener('click', e => {
    e.preventDefault();
    if(!usernameInput.value) {
        return console.log("Username empty !");
    }
    username = usernameInput.value;
    //push message to message array
    sendMessage({
        author: username,
        type: messageTypes.LOGIN
    });
    //Hide login and show messageList
    loginWindow.classList.add('hidden');
    chatWindow.classList.remove('hidden');
    //Show messages
    displayMessages();
});

//SendBtn callback
sendBtn.addEventListener('click', e => {
    e.preventDefault();
    if (!messageInput.value) {
        return console.log('Message empty');
    }
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const message = {
        author: username,
        date: date,
        content: messageInput.value,
        type: messageTypes.RIGHT
    };

    sendMessage(message);

    displayMessages();

    messageInput.value = "";
    messageInput.focus();
});

const sendMessage = message => {
    socket.emit('message', message);
};
