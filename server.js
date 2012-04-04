var clients = 0;

var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/client.html', function (req, res) {
  res.sendfile(__dirname + '/client.html');
});

app.get('/js/paper.js', function (req, res) {
  res.sendfile(__dirname + '/js/paper.js');
});

app.get('/js/keyDecode.js', function (req, res) {
  res.sendfile(__dirname + '/js/keyDecode.js');
});

io.sockets.on('connection', function (socket) {
  clients += 1;
  console.log("Clients: " + clients);
  socket.emit('clientnum', clients);
  socket.on('up', function (data) {
    socket.broadcast.emit('velchange', {velx: 0, vely: -1, client:data});
  });
  socket.on('down', function (data) {
    socket.broadcast.emit('velchange', {velx: 0, vely: 1, client:data});
  });
  socket.on('left', function (data) {
    socket.broadcast.emit('velchange', {velx: -1, vely: 0, client:data});
  });
  socket.on('right', function (data) {
    socket.broadcast.emit('velchange', {velx: 1, vely: 0, client:data});
  });
});
