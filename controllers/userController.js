import addUserModel from "../models/userModel.js";
import PostModel from "../models/postsModel.js";
// import postsController from "../models/postsModel.js";

async function registerUser(req, res) {
    // se om anv finns i db
   // returnera obj som talar om ifall anv finns tex fail/success

    try {
        const {
            username,
            password
        } = req.body;

        const userDoc = new addUserModel({
            username,
            password
        });

        // tex const result = user.save(); - annat än null = är sparad
        // returnera obj om att det gick bra 
        userDoc.save();


    } catch {
        console.error("Error controller / reg user", err);
    } finally {
        res.redirect("/register/login");
        console.log("User succesfully created");
    }
}

async function loginUser(req, res) {
    let query = null;

    const posts = await PostModel.find({});

    const locals = {
        posts
    };

    try {

        const {username, password} = req.body;

        const user = await addUserModel.findOne({username});

        if (!user) {
            console.log("No user found");
        }

        const checkUser = await user.comparePassword(password, user.password);

        if (!checkUser) {
            console.log("User is not ahutentificated");
            throw new Error("No user found");
        }

        req.session.checkUser = true;
        req.session.userID = user._id;

    } catch (err) {
        console.log("Error in loginUser / userController ", err);
        const query = new URLSearchParams({
            type: "fail", 
            message: "login failed",
        }).toString();
        return res.redirect(`/login?${query}`)
    } finally {
        const query = new URLSearchParams({
            type: "success", 
            message: "login successful",
        }).toString();
        return res.redirect(`/index?${query}`)


        // res.render("index", locals);
    }
}

export default {
    registerUser, loginUser
};