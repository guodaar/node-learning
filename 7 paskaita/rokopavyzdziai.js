app.get('/', async (req, res) => {
  const { brand } = req.query;

  try {
    const con = await client.connect();

    const data = await con

      .db('first')

      .collection('cars')

      .find(brand ? { brand } : {})

      .toArray();

    await con.close();

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', async (req, res) => {
  const { brand, sort, property } = req.query;

  try {
    const con = await client.connect();

    const data = await con

      .db('first')

      .collection('cars')

      .find(brand ? { $or: [{ brand: { $in: brand.split(',') } }] } : {})

      .sort(sort ? { [property]: sort === 'asc' ? 1 : -1 } : {})

      .toArray();

    await con.close();

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// localhost:3000/?sort=desc&property=brand
