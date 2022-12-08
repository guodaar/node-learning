// 1 npm init (sukuria package.json faila)
// 2 npm install {package}/// arba nusikopijuoti dependencies ir npm install

// Jeigu neimportavo env failo
// 1. patikrinti kintamuju pavadinimus
// 2. modulio importavima ir config paleidima
// 3. .env failas turi buti root folderyje prie package.json

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const cars = [
  {
    id: 1,
    make: 'BMW',
    model: '530',
    color: 'black',
  },
  {
    id: 2,
    make: 'Audi',
    model: 'A6',
    color: 'white',
  },
];

app.get('/cars', (req, res) => {
  res.send(cars);
});

app.get('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const car = cars.find((car) => car.id === id);
  if (car) {
    res.send(car);
  } else {
    res.status(404).send({
      error: 'Car not found',
    });
  }
});

// atsiuncia {make, model, color}
// gauna {id, make, model, color}
app.post('/cars', (req, res) => {
  const car = req.body;
  if (car.make && car.model && car.color) {
    const newCar = { ...car, id: Math.floor(Math.random() * 1000) + 1 };
    cars.push(newCar);
    res.send(newCar);
  } else {
    res.status(400).send({
      error: 'Invalid request',
    });
  }
});

app.put('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const car = cars.find((car) => car.id === id);
  const index = cars.indexOf(car);
  if (car.make && car.model && car.color) {
    const newCar = { ...req.body, id: id };
    cars.splice(index, 1, newCar);
    res.send(newCar);
  } else {
    res.status(400).send({
      error: 'Invalid request',
    });
  }
});

app.delete('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const car = cars.find((car) => car.id === id);
  const index = cars.indexOf(car);
  if (car) {
    cars.splice(index, 1);
    res.send();
  } else {
    res.status(404).send({
      error: 'Car not found',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
