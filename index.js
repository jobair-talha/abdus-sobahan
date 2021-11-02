const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 7000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xuu56.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("serviceMaster");
    const serviceCollection = database.collection("services");

    // create a document to insert
    app.post("/service", async (req, res) => {
      const newService = req.body;
      const result = await serviceCollection.insertOne(newService);
      console.log("Service added", newService);
      res.json(result);
    });
    app.get("/service", async (req, res) => {
      const cursor = serviceCollection.find({});
      const service = await cursor.toArray();
      res.send(service);
    });
  } finally {
    // await client.close();
  }
}
app.get("/", (req, res) => {
  res.send("Hello World");
});
// https://stark-stream-55742.herokuapp.com/
run().catch(console.dir);

app.listen(port, () => {
  // AVYHo4p5qrfdtwWY
  console.log(`Example app listening at http://localhost:${port}`);
});
