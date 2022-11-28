import connectDb from "../configurations/mongodb.js";

const db = await connectDb();

// const db = client.db("explore-app");
// const postCollection = db.collection("explore-app");

async function getPosts(req, res) {
    const posts = await db.collection("explore-app").find({}).toArray();
    const locals = {posts};

    console.log(posts);
    res.render('index', locals);

}

export default { getPosts };