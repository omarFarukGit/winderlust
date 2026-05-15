import express from "express";
import "dotenv/config";
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI_2;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    //create db
    const db = client.db("wanderlust");
    //create collections
    const destinationCollection = db.collection("destinations");
    app.get("/destination", async (req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    });
    app.get("/destination/:id", async (req, res) => {
      const { id } = req.params;

      const result = await destinationCollection
        .findOne({ _id: new ObjectId(id) })
      res.json(result);
    });

    app.post("/destination", async (req, res) => {
      const destination = req.body;
      console.log(destination);

      const result = await destinationCollection.insertOne(destination);
      // res.status(201).send({
      //   success: true,
      // });
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
