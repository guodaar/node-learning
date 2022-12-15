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
  try {
    const con = await client.connect();
    const data = await con.db('6paskaita').collection('pets').find().toArray();
    res.send(data);
    await con.close();
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/pets/byoldest', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('6paskaita')
      .collection('pets')
      .find()
      .sort({ age: -1 })
      .toArray();
    res.send(data);
    await con.close();
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/pets/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const con = await client.connect();
    const data = await con
      .db('6paskaita')
      .collection('pets')
      .find({ type })
      .toArray();
    if (data.length) {
      res.send(data);
    } else {
      res.status(404).send({
        error: 'Not found',
      });
    }
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
