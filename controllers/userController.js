import addUserModel from "../models/userModel.js";
import PostModel from "../models/postsModel.js";
// import postsController from "../models/postsModel.js";

async function getRegister(req, res) {
    res.render("register", {serverMsg: req.query})
}

async function getLogin(req, res) {
    res.render("login", {serverMsg: req.query})
}

async function registerUser(req, res) {
    // se om anv finns i db
    // returnera obj som talar om ifall anv finns tex fail/success

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

        if(username.value === "" || password.value === "") {
            throw new Error("Username or password is wrong")
        }

        // tex const result = user.save(); - annat än null = är sparad
        // returnera obj om att det gick bra 
        userDoc.save();

        query = new URLSearchParams({
            type: "success",
            message: "User successfully created",
        }).toString();

        console.log("Try");

        return res.redirect(`/register/login?${query}`);

    } catch {
        // console.error("Error controller / reg user", error);
        query = new URLSearchParams({
            type: "fail",
            message: "You need to fill in both username and password",
        }).toString();

        // res.redirect("/register");
        res.redirect(`/register?${query}`);
        console.log("Catch");
    } 
    
    // finally {
    //     
    //     console.log("User succesfully created");
    // }
}

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

        if (!user) {
            throw new Error("Wrong username");
        }

        const checkUser = await user.comparePassword(password, user.password);

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
        console.log("Error in loginUser / userController ", err);
       
        query = new URLSearchParams({
            type: "fail",
            message: "Wrong password or username, try again",
        }).toString();

       return res.redirect(`/register/login?${query}`)
        
    } 
}

async function logOutUser(req, res) {
    try {
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