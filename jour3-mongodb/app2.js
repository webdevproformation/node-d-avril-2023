const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://doranco:q69fQqBwpDwx9uVw@cluster0.5ih2fl4.mongodb.net/demo2?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);


// https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb

async function insert (){
    const myDB = client.db("demo2");
    const myColl = myDB.collection("pizzaMenu");
    const doc = {"nom" : "ALain", age : 22};
    const result = await myColl.insertOne(doc);
    console.log(
    `A document was inserted with the _id: ${result.insertedId}`,
    );
}

insert ()