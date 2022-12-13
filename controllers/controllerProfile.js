import PostModel from '../models/postsModel.js'
import { ObjectId } from 'mongodb';

// get userPosts at profile
async function getUserPosts(req, res) {

    const { userID } = req.session;

    // show the post posted by user
    const userPosts = await PostModel.find({ byUser: ObjectId(userID)});
    const byUser = ObjectId(req.session.userID);

    const locals = {
        userPosts,
        byUser,
        serverMsg: req.query
    };

    res.render('profile', locals);

}; 

export default { getUserPosts };