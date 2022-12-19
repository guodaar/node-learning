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

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con
//       .db('first')
//       .collection('orders')
//       .count({ product: 'guitar' });
//     await con.close();
//     res.send(`${data}`);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con.db('first').collection('orders').distinct('product');
//     await con.close();
//     res.send({ count: data });
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('first')
      .collection('orders')
      .aggregate([
        { $match: { customer: { $in: ['Mike', 'Karen'] } } },
        { $group: { _id: '$customer', total: { $sum: '$total' } } },
        { $sort: { total: -1 } },
      ])
      .toArray();
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('first')
      .collection('orders')
      .insertMany([
        { product: 'toothbrush', total: 4.75, customer: 'Mike' },
        { product: 'guitar', total: 199.99, customer: 'Tom' },
        { product: 'milk', total: 11.33, customer: 'Mike' },
        { product: 'pizza', total: 8.5, customer: 'Karen' },
        { product: 'toothbrush', total: 4.75, customer: 'Karen' },
        { product: 'pizza', total: 4.75, customer: 'Dave' },
        { product: 'toothbrush', total: 4.75, customer: 'Mike' },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
