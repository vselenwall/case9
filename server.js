// dependencies
import express from 'express';

// imported routes
import routeWelcome from './routes/route-welcome.js'
import routeLogin from './routes/route-login.js'
import routeRegister from './routes/route-register.js'
import routeIndex from './routes/route-index.js'

const app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.listen(5000, function() {
    console.log("Listening on port 5000");
});

app.use('/', routeWelcome);
app.use('/start', routeWelcome);
app.use('/home', routeWelcome);

app.use('/login', routeLogin);
app.use('/register', routeRegister);
app.use('/index', routeIndex);

app.use((req, res, next) => {
    res.status(404).send("404: We couldn't find this page.");
    next();
})

app.use((req, res, next) => {
    res.status(500).send("500: Server error - please return later.");
    next();
})