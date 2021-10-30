const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.port || 5000;



const uri = "mongodb+srv://mydbuser00:7TcW1FRy6rkZayqT@cluster0.wq6cx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const usersCollection = database.collection("users");
        // create a document to insert
        const doc = {
            name: "Record of a cell no 303",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
        }
        const result = await usersCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running my CRUD Server')
})

app.listen(port, () => {
    console.log(`Running server on port`, port);
})