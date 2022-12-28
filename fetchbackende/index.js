require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    console.log(data.results);
    const con = await client.connect();
    const insert = await con
      .db('people')
      .collection('names')
      .insertOne({
        name: `${data.results[0].name.first} ${data.results[0].name.last}`,
      });
    const show = await con.db('people').collection('names').find().toArray();
    await con.close();
    res.send(show);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
