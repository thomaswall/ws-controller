var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 1337 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.broadcast(message);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
