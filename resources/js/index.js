const nameInput = document.getElementById(`my-name-input`);
const messageInput = document.getElementById(`my-message`);
const sendButton = document.getElementById(`send-button`);
const chatBox = document.getElementById(`chat`);
const serverUrl = `https://it3049c-chat.fly.dev/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `
      <div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
          
        </div>
      </div>
    `;
  } else {
    return `
      <div class="your messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div>
    `;
  }
}
async function fetchMessages() {
  const response = await fetch(serverUrl);
  const messages = await response.json();
  console.log(messages);
  return messages;
}
async function updateMessages() {
  const messages = await fetchMessages();
  let formattedMessages = ``;
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}
function sendMessages(username, text) {
  const data = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  fetch(serverUrl, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`
    },
    body: JSON.stringify(data)
  });
}

sendButton.addEventListener(`click`, function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = messageInput.value;

  sendMessages(sender, message);
  messageInput.value = ``;
});

updateMessages();
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
