// import connectDb from "../configurations/mongodb.js";
// import PostModel, { PostSchema } from "../models/postsModel.js";
import PostModel from '../models/postsModel.js'

// const db = await connectDb();

// // const db = client.db("explore-app");
// // const postCollection = db.collection("explore-app");

// const postsCollection = db.collection('posts');

async function getPosts(req, res) {
    const posts = await PostModel.find({});

    // const posts = await db.collection("posts").find({}).toArray();

    const locals = {posts};

    console.log("Posts here", posts);
    res.render('index', locals);
};


export default { getPosts };