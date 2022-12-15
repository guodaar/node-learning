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

app.get('/pets', async (req, res) => {
  const { sort } = req.query;
  try {
    const con = await client.connect();
    const data = await con
      .db('6paskaita')
      .collection('pets')
      .find()
      .sort(sort ? { age: sort === 'asc' ? 1 : -1 } : {})
      .toArray();
    res.send(data);
    await con.close();
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/pets', async (req, res) => {
  try {
    const pet = req.body;
    const con = await client.connect();
    if (pet.name && pet.type && pet.age) {
      const newPet = { ...pet };
      const data = await con
        .db('6paskaita')
        .collection('pets')
        .insertOne(newPet);
      res.send(data);
    } else {
      res.status(400).send({
        error: 'Invalid request',
      });
    }
    await con.close();
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
