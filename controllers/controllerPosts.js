// import connectDb from "../configurations/mongodb.js";
// import PostModel, { PostSchema } from "../models/postsModel.js";
import PostModel from '../models/postsModel.js'
import { ObjectId } from 'mongodb';

// const db = await connectDb();

// // const db = client.db("explore-app");
// // const postCollection = db.collection("explore-app");

// const postsCollection = db.collection('posts');

async function getPosts(req, res) {
    
    const posts = await PostModel.find({})

    // visibility: 'public'.populate("byUser", "username").exec();

    // const posts = await db.collection("posts").find({}).toArray();

    // const {userId} = req.session
    // const userPosts = await PostModel.find({byUser: ObjectId(userId)});

    // userPosts 
    const locals = {
        posts
    };

    // console.log("Posts here posts", posts);
    // console.log("Posts here locals", locals);

    res.render('index', locals);
};

async function addPost(req, res) {

    try {

        const {
            location,
            description,
        } = req.body;

        const byUser = ObjectId(req.session.userID);

        // Add visiblility from radio btns

        const postDoc = new PostModel({
            location,
            description,
            byUser
        });

        postDoc.save();
    } catch {
        console.error("Error controller addpost");
    } finally {
        res.redirect("/index");
       
    }
}

export default {
    getPosts,
    addPost
};