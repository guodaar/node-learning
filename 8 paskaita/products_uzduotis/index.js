require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/categories', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('8paskaita')
      .collection('categories')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('8paskaita')
      .collection('products')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/categoryValue', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('8paskaita')
      .collection('categories')
      .aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'category',
            foreignField: 'category',
            as: 'products',
          },
        },
        {
          $project: {
            category: '$category',
            total: {
              $sum: '$products.price',
            },
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('8paskaita')
      .collection('products')
      .deleteMany({ category: 'phones' });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('8paskaita')
      .collection('products')
      .deleteOne({ _id: ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
