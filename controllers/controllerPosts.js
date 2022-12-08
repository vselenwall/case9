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
        byUser,
        serverMsg: req.query
    };

    // console.log("Posts here posts", posts);
    // console.log("Posts here locals", locals);

    res.render('index', locals);
};

async function addPost(req, res) {
    let query = null; 

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

        query = new URLSearchParams({type: "success", message: "You created a quote successfully"});
    } catch {
        query = new URLSearchParams({type: "fail", message: err.message});
        console.error("Error controller addpost");
    } finally {

        const qStr = query.toString();
        res.redirect(`/index?${qStr}`);
        // res.redirect("/index");
       
    }
}

async function editPost(req, res) {
    try {
        // const id = req.params.id;

        console.log(req.body);

        const { location, description, id } = req.body;

        const result = await PostModel.updateOne(
            { _id: ObjectId(id) }, 
            { location:location },{ description:description }
        );

        console.log("try", result, ObjectId(id),location,description);
    } catch(err) {
        console.error(err.message);
        const query = new URLSearchParams({type: "failed", message: err.message});
        return res.redirect(`/index?${query}`);

    } finally {
        const query = new URLSearchParams({type: "success", message: "Post successfully updated"});
        res.redirect(`/index?${query}`);
        
        console.log("finally");
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