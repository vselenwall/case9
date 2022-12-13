// dependencies
import express from 'express';
import dotenv from 'dotenv';
import {
    MongoClient
} from 'mongodb';
import session from 'express-session';

// imported routes
import routeWelcome from './routes/route-welcome.js'
import routeIndex from './routes/route-index.js'
import routeUser from './routes/route-user.js';
import routeProfile from './routes/route-profile.js'

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 6000000 * 10
    }
}))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.set("view engine", "ejs");

function checkSession(req, res, next) {
    console.log("session", req.session);
    next();
}

app.use(checkSession);

app.use(express.static("./public"));

app.listen(2000, function () {
    console.log("Listening on port 2000");
});

app.use('/', routeWelcome);
app.use('/start', routeWelcome);
app.use('/home', routeWelcome);

app.use('/index', routeIndex);

app.use('/register', routeUser);
app.use('/login', routeUser);

app.use('/profile', routeProfile);

app.use((req, res, next) => {
    res.status(404).send("404: We couldn't find this page.");
    next();
})

app.use((req, res, next) => {
    res.status(500).send("500: Server error - please return later.");
    next();
})