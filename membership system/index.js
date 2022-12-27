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

app.get('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('memberships')
      .collection('services')
      .find()
      .sort({ price: 1 })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/memberships', async (req, res) => {
  try {
    const service = req.body;
    const con = await client.connect();
    if (service) {
      const data = await con
        .db('memberships')
        .collection('services')
        .insertOne(service);
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

app.delete('/memberships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('memberships')
      .collection('services')
      .deleteOne({ _id: ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/users/:order', async (req, res) => {
  const { order } = req.params;
  try {
    const con = await client.connect();
    const data = await con
      .db('memberships')
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service_id',
            foreignField: '_id',
            as: 'membership',
          },
        },
        { $unwind: '$membership' },
        {
          $project: {
            name: '$name',
            surname: '$surname',
            email: '$email',
            membership_name: '$membership.name',
          },
        },
        { $sort: { name: order === 'asc' ? 1 : -1 } },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const serviceId = req.body.service_id;
    const con = await client.connect();
    if (user) {
      const data = await con
        .db('memberships')
        .collection('users')
        .insertOne({ ...user, service_id: ObjectId(serviceId) });
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
