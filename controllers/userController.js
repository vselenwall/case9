import addUserModel from "../models/userModel.js";

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
        res.redirect("/login");
    }
}

export default {
    registerUser
};