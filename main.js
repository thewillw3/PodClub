// PORT!
const PORT = 8081;

// Importing modules.
const revGen = require('./modules/generate.js');

// Setting up express.
const express = require('express');
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
app.listen(PORT);
console.log(`Server currently listening on port ${PORT}!`);