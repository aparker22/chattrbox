let WebSocket = require('ws')
let WebSocketServer = WebSocket.Server;
let port = 3001;
let ws = new WebSocketServer({
	port: port
});

ws.on('connection', (client, req) => {
    console.log('client connection established');
    var id = req.headers['sec-websocket-key'];
    ws.clients.forEach( (client) => {
        client.send(`Welcome to the channel ${id}`)
    })

	client.on('message', (data) => {
        console.log('message received: ' + data);
        ws.clients.forEach( (client) => {
                client.send(data);
        });
	});
});
