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

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('9paskaita').collection('users').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    if (user.name && user.email) {
      const data = await con
        .db('9paskaita')
        .collection('users')
        .insertOne(user);
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

app.get('/comments', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('9paskaita')
      .collection('comments')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_comments',
          },
        },
        { $unwind: '$user_comments' },
        {
          $project: {
            date: '$date',
            comment: '$comment',
            name: '$user_comments.name',
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

app.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('9paskaita')
      .collection('comments')
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
