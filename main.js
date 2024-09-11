// PORT!
const PORT = 8081;

// Importing all necessities!
const revGen = require('./modules/generate.js');
const express = require('express');
const socketio = require('socket.io');

const app = express();

// Setting view engine and serving static files!
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Testing things.
let reviews = [];

for(let i = 0; i < 4; i++) {
    revGen.genReview().then((review) => {
        reviews.push(review);
    });
}

// Directing to the homepage.
app.get('/', (req, res) => {
    res.render('pages/index', {reviews: reviews});
});

app.get('/podpicker', (req, res) => {
    res.render('pages/podpicker');
});

app.get('*', (req, res) => {
    res.render('pages/404');
});

// The server is listening! Hello!
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});

// Setting up socket necessities.
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('NameSubmit', (data) => {
        console.log(`Incoming message from ${socket.id}: ${data}`);

        revGen.genPodEligibility(data).then((result) => {
            socket.emit('NameReceive', result);
        });
    });
});