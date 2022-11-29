// dependencies
import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
// import connectDb from "./configurations/mongodb.js";

// imported routes
import routeWelcome from './routes/route-welcome.js'
import routeIndex from './routes/route-index.js'

const app = express();
// const db = await connectDb();
// const postsCollection = db.collection('posts');

// Middlewares
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.listen(2000, function() {
    console.log("Listening on port 2000");
});

app.use('/', routeWelcome);
app.use('/start', routeWelcome);
app.use('/home', routeWelcome);

app.use('/index', routeIndex);

dotenv.config();

console.log(process.env.MONGODB_URL);

import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const mongodbClient = new MongoClient(process.env.MONGODB_URL);

if (!process.env.MONGODB_URL) {
    console.error("MongoDB URL file is not defined");
    exit();
}

async function main() {
  try {

    await mongodbClient.connect();
    console.log("YES! You're connected to the database");

    const db = mongodbClient.db("explore-app");
    const postsCollection = db.collection("posts");
    const post = await postsCollection.find().toArray();

    console.log(post);

    const app = express();

    app.use(express.urlencoded({ extended: true }));

    app.get("/", function(req,res) {
        res.render("index");
    })
    // app.get("/", function (req, res) {
    //   res.sendFile(`${__dirname}/index.html`);
    //   // res.send(`This is a change`);
    // });

    app.post("/posts", async function (req, res) {
      console.log("Hi user submitted a post");
      console.log(req.body);

      await postsCollection.insertOne(req.body);
      console.log("New quote has been added", req.body)
      res.render("index");
    });

    // app.listen(3000, function () {
    //   console.log("Listening on 3000");
    // });
  } finally {
    console.log("App is ready to receive requests");
  }
}

main().catch((err) => console.error(err));

mongodbClient.close();


// here
// app.post('/posts', function(req, res) {
//     postsCollection.insertOne(req.body)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => console.error(error));

//     console.log(req.body)
// })

app.use((req, res, next) => {
    res.status(404).send("404: We couldn't find this page.");
    next();
})

app.use((req, res, next) => {
    res.status(500).send("500: Server error - please return later.");
    next();
})