const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000 ;


//middleware
app.use(cors());
app.use(express.json());


// lonelyPlanet
// MfiMP7TF66cffSSJ

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
//   process.env.DB_PASS
//   process.env.DB_USER
// ----------------------------------------------------------


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wkehc2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
// const uri = "mongodb+srv://lonelyPlanet:MfiMP7TF66cffSSJ@cluster0.wkehc2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// ----------------------------------------------------------------------------------


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();                                    ----> comment korte bolse

    // journey start--------🦾
const spotCollection = client.db('spotDB').collection('spot');
    
    app.get('/spot' , async(req,res)=>{
         const cursor = spotCollection.find();
         const result = await cursor.toArray();
         res.send(result);
    })
 

    app.post('/spot' , async(req,res)=>{
        const  newSpot = await req.body;
        console.log(newSpot);
        const result = await spotCollection.insertOne(newSpot);
        res.send(result);

    })

    app.get('/mylist/:email' , async(req,res)=>{
        // console.log(req.params.email);
        const result =   await spotCollection.find({email:req.params.email}).toArray();
        res.send(result)
    })





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });             ----> comment korte bolse
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();                                      ----> comment korte bolse
  }
}
run().catch(console.dir);

// ----------------------------------------------------------




app.get('/' , (req ,res)=>{
    res.send('Assignment Ten CRUD IS  RUNNING')
})


app.listen(port , ()=>{
    console.log(`Assignment ten Crud is running on port , ${port}`)
})
