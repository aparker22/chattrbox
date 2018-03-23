let ws = new WebSocket('ws://localhost:3001') 

let form = document.querySelector('body > div > section > form');
let panel = document.querySelector('body > div > div');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let message = form.message.value;
    ws.send(message);
    form.reset();
})

ws.addEventListener('message', function(event) {
    let li = createMessageLiElement(event.data);
    appendLiToUl(li);

});

let createMessageLiElement = (message) => {
    let liElement = document.createElement('li');
    liElement.textContent = message;
    return liElement;
}

let appendLiToUl = (li) => {
    let ul = document.querySelector('body > div > div > ul');
    ul.appendChild(li);
}




