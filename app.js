var express = require("express"),
    exphbs  = require('express3-handlebars');
var app = express();
var port = 3700;

// Tell ExpressJS that I want Handlebars for templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Register route
app.get('/', function(req, res){
    res.render('home');
});

// Define where static files are placed
app.use(express.static(__dirname + '/public'));

// Run server on defined port
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

// Setup SocketIO
io.sockets.on('connection', function (socket) {

  // Upon successful connection, send welcome msg
  socket.emit('message', { message: 'welcome to the chat' });

  // Catch 'send' msg from client
  socket.on('send', function (data) {
    // Emit to all clients
    io.sockets.emit('message', data);
  });

});
