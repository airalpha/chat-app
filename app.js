const messageTypes = {
    LEFT: 'left',
    RIGHT: 'right',
    LOGIN: 'login'
};

//Chat stuff
const chatWindow = document.getElementById('chat');
const messageList = document.getElementById('messageList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

//Login stuff
let username = '';
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = []; // {author, date, content, type}

//Take message and return the correct html result


