import express from "express";
import "dotenv/config";
const app = express();
const port = 3000;
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI_2;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.use(express.json());
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    //create db
    const db = client.db("wanderlust");
    //create collections
    const destinationCollection = db.collection("destinations");

    app.post("/destination", async (req, res) => {
      const destination = req.body;
      const result = await destinationCollection.insertOne(destination);
      res.status(201).send({
        success: true,
      });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    console.log("error");
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
