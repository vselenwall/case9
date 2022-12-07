// import connectDb from "../configurations/mongodb.js";
// import PostModel, { PostSchema } from "../models/postsModel.js";
import PostModel from '../models/postsModel.js'
import { ObjectId } from 'mongodb';

// const db = await connectDb();

// // const db = client.db("explore-app");
// // const postCollection = db.collection("explore-app");

// const postsCollection = db.collection('posts');

async function getPosts(req, res) {
    
    const posts = await PostModel.find({ visibility: 'public'}).populate("byUser", "username").exec();

    const { userID } = req.session;
    const byUser = await PostModel.find({ byUser: ObjectId(userID)});

   

    // const posts = await db.collection("posts").find({}).toArray();

    // const {userId} = req.session
    // const userPosts = await PostModel.find({byUser: ObjectId(userId)});

    // userPosts 
    const locals = {
        posts,
        byUser
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

async function editPost(req, res) {
    try {
        const id = req.params.id;

        const { location, description, visibility } = req.body;

        await PostModel.updateOne(
            { _id: ObjectId(id) }, 
            { location, description, visibility }
        );
    } catch(err) {
        console.error(err.message);
        const q = new URLSearchParams({type: "success", message: err.message});
        return res.redirect(`/index?${q}`);
    } finally {
        const q = new URLSearchParams({type: "success", message: "Post successfully updated"});
        res.redirect(`/index?${q}`);
      }
}

async function deletePost(req, res) {
    try {
      const { id } = req.params;
    
      const result = await PostModel.deleteOne({ _id: id });
      
      if (result.deletedCount == 0) {
        throw {message: "No delete has been done"};
      }
  
    } catch (err) {
      console.error(err.message);
    } finally {
      res.redirect("/index");
    }
  }

export default {
    getPosts,
    addPost,
    editPost,
    deletePost
};