import addUserModel from "../models/userModel.js";
import PostModel from "../models/postsModel.js";

// render register
async function getRegister(req, res) {
    res.render("register", {
        serverMsg: req.query
    })
}

// render login
async function getLogin(req, res) {
    res.render("login", {
        serverMsg: req.query
    })
}

// "become a member", add a user
async function registerUser(req, res) {

    let query = null;

    try {
        const {
            username,
            password
        } = req.body;

        const userDoc = new addUserModel({
            username,
            password
        });

        if (username.value === "" || password.value === "") {
            throw new Error("Username or password is wrong")
        }

        userDoc.save();

        query = new URLSearchParams({
            type: "success",
            message: "User successfully created",
        }).toString();

        return res.redirect(`/register/login?${query}`);

    } catch {
        query = new URLSearchParams({
            type: "fail",
            message: "You need to fill in both username and password",
        }).toString();

        res.redirect(`/register?${query}`);
    }

}

// login existing user 
async function loginUser(req, res) {
    let query = null;

    const posts = await PostModel.find({});

    const locals = {
        posts,
        serverMsg: req.query
    };

    try {

        const {
            username,
            password
        } = req.body;

        const user = await addUserModel.findOne({
            username
        });

        // if username dosent exist in db
        if (!user) {
            throw new Error("Wrong username");
        }

        const checkUser = await user.comparePassword(password, user.password);

        // check if user auth
        if (!checkUser) {
            console.log("User is not ahutentificated");
            throw new Error("No user found");
        }

        req.session.checkUser = true;
        req.session.userID = user._id;

        query = new URLSearchParams({
            type: "success",
            message: "You're logged in, welcome",
        }).toString();
        return res.redirect(`/index?${query}`)

    } catch (err) {
        query = new URLSearchParams({
            type: "fail",
            message: "Wrong password or username, try again",
        }).toString();

        return res.redirect(`/register/login?${query}`)

    }
}

// log out user, get login 
async function logOutUser(req, res) {
    try {

        // destroy session
        req.session.destroy();
    } catch (err) {
        const query = (new URLSearchParams({
            type: "fail",
            message: "Log out failed",
        })).toString();
        return res.redirect(`/index?${query}`);
    } finally {
        const query = (new URLSearchParams({
            type: "success",
            message: "You're logged out, welcome back",
        })).toString();
        return res.redirect(`/register/login?${query}`);
    }
}

export default {
    registerUser,
    loginUser,
    logOutUser,
    getRegister,
    getLogin
};