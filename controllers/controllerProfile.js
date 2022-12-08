import PostModel from '../models/postsModel.js'
import { ObjectId } from 'mongodb';

async function getUserPosts(req, res) {
    
    // const posts = await PostModel.find({ visibility: 'public'}).populate("byUser", "username").exec();

    const { userID } = req.session;
    const userPosts = await PostModel.find({ byUser: ObjectId(userID)});

    const locals = {
        userPosts,
        serverMsg: req.query
    };

    res.render('profile', locals);

    // const posts = await PostModel.find({ visibility: 'public'}).populate("byUser", "username").exec();

    // const { userID } = req.session;
    // const byUser = await PostModel.find({ byUser: ObjectId(userID)});

    // // const posts = await db.collection("posts").find({}).toArray();

    // // const {userId} = req.session
    // // const userPosts = await PostModel.find({byUser: ObjectId(userId)});

    // // userPosts 
    // const locals = {
    //     posts,
    //     byUser,
    //     serverMsg: req.query
    // };

    // // console.log("Posts here posts", posts);
    // // console.log("Posts here locals", locals);

    // res.render('profile', locals);

}; 

export default { getUserPosts };