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

app.get('/people', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('first').collection('people').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/people', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('first').collection('people').insertOne({
      firstName: 'Rytis',
      lastName: 'Vytis',
      age: '16',
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
