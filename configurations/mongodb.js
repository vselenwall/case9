import { MongoClient } from 'mongodb';
import { MONGODB_URL, MONGODB_NAME } from "./configs.js";

const client = new MongoClient(MONGODB_URL);

async function connectDb() {

    try {
        await client.connect();
        console.log("Database connected");
        return client.db(MONGODB_NAME);
    } catch (error) {
        console.log("Database error");
    }
    
}

export default connectDb;