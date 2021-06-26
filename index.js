const express = require('express');
const { MongoClient } = require('mongodb');
var cors = require('cors')
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7tlf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const blogPostCollection = client.db(`${process.env.DB_NAME}`).collection("blogs");
  
    app.post("/postBlog", (req, res) => {
        console.log('added post blog', req.body)
        blogPostCollection.insertOne(req.body)
        .then(result =>{
            res.send(result.insertedCount > 0)
        })
    })

    app.get('/getBlogs', (req, res) => {
        blogPostCollection.find()
        .toArray((err, data) => {
            res.send(data);
        })
    })

});



app.get('/', (req, res) => {
  res.send('Hello World! this is my PHero test Task')
})

app.listen(5050)