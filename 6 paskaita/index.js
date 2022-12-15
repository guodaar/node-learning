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

app.get('/posts', async (req, res) => {
  try {
    const { title } = req.query;
    const con = await client.connect();
    const data = await con
      .db('6paskaita')
      .collection('posts')
      .find(title ? { title } : {})
      .toArray();
    res.send(data);
    await con.close();
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('6paskaita')
      .collection('posts')
      .findOne(ObjectId(id));
    if (data) {
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

app.post('/posts', async (req, res) => {
  try {
    const post = req.body;
    const con = await client.connect();
    if (post.title && post.body) {
      const newPost = {
        userID: 1,
        id: Math.floor(Math.random() * 1000) + 1,
        ...post,
      };
      const data = await con
        .db('6paskaita')
        .collection('posts')
        .insertOne(newPost);
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

app.put('/posts/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const id = +req.params.id;
    const data = await con.db('6paskaita').collection('posts').updateOne(
      { id: id },
      {
        $set: req.body,
      },
    );
    res.send(data);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const id = +req.params.id;
    const data = await con
      .db('6paskaita')
      .collection('posts')
      .deleteOne({ id: id });
    await con.close();
    res.send();
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
