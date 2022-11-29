import express from "express";
import { MongoClient } from "mongodb";
import { exit } from "process";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGODB_URL);

// import * as url from "url";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

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

    // const app = express();

    // app.use(express.urlencoded({ extended: true }));

    // app.get("/", function(req,res) {
    //     res.render("index");
    // })
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