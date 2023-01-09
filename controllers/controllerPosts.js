import PostModel from '../models/postsModel.js'
import {
    ObjectId
} from 'mongodb';

// get all posts - index
async function getPosts(req, res) {

    // show the published posts
    const posts = await PostModel.find({
        visibility: 'public'
    }).populate("byUser", "username").exec();

    const {
        userID
    } = req.session;
    const byUser = await PostModel.find({
        byUser: ObjectId(userID)
    });

    const locals = {
        posts,
        byUser,
        userID,
        serverMsg: req.query
    };

    res.render('index', locals);
};

// add post to index
async function addPost(req, res) {
    let query = null;

    try {

        const {
            location,
            description,
            visibility
        } = req.body;

        const byUser = ObjectId(req.session.userID);

        const postDoc = new PostModel({
            location,
            description,
            byUser,
            visibility
        });

        await postDoc.save();

        query = new URLSearchParams({
            type: "success",
            message: "You created a post"
        });
    } catch {
        query = new URLSearchParams({
            type: "fail",
            message: "Something went wrong, please try again"
        });
        console.error("Error controller addpost");
    } finally {
        const qStr = query.toString();
        res.redirect(`/index?${qStr}`);

    }
}

// edit post in profile
async function editPost(req, res) {
    let query = null;

    try {

        const {
            location,
            description,
            visibility,
            id
        } = req.body;

        const result = await PostModel.updateOne({
            _id: ObjectId(id)
        }, {
            location,
            description,
            visibility
        });

        query = new URLSearchParams({
            type: "success",
            message: "Post successfully updated"
        });
    } catch (err) {
        console.error(err.message);
        query = new URLSearchParams({
            type: "fail",
            message: err.message
        });
        return res.redirect(`/profile?${query}`);
    } finally {
        res.redirect(`/profile?${query}`);
    }
}

// delete post in profile 
async function deletePost(req, res) {
    let query = null;

    try {
        const {
            id
        } = req.params;

        const result = await PostModel.deleteOne({
            _id: id
        });

        if (result.deletedCount == 0) {
            throw {
                message: "No delete has been done"
            };
        }

    } catch (err) {
        console.error(err.message);
        query = new URLSearchParams({
            type: "fail",
            message: err.message
        });
    } finally {
        query = new URLSearchParams({
            type: "success",
            message: "Post successfully deleted"
        });
        res.redirect(`/profile?${query}`);
    }
}

export default {
    getPosts,
    addPost,
    editPost,
    deletePost
};