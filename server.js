import express from 'express';

const app = express();

app.listen(5000, function() {
    console.log("Listening on port 5000");
});

app.get('/', (req, res) => {
    res.send('Hello, its me');
});