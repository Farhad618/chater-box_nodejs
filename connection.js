// "mongodb+srv://admin_farhad:9Xalc9Re9fBB2TPU@cluster0.guc3q.mongodb.net/?retryWrites=true&w=majority"

import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://admin_farhad:9Xalc9Re9fBB2TPU@cluster0.guc3q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = await client.db("chater-box_n");
const user = await db.collection("users");
const tokens = await db.collection("access-tokens");
const chats = await db.collection("chats");



export { user, client, tokens, chats }
