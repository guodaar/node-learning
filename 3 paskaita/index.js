///// 1 npm init (sukuria package.json faila) //// 2 npm install {package}/// arba nusikopijuoti dependencies ir npm install///

console.log("hello!");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const cars = [
  {
    id: 1,
    make: "BMW",
    model: "530",
    color: "black",
  },
  {
    id: 2,
    make: "Audi",
    model: "A6",
    color: "white",
  },
];

app.get("/cars", (req, res) => {
  res.send(cars);
});

app.get("/cars/:id", (req, res) => {
  const id = +req.params.id;
  const car = cars.find((car) => car.id === id);
  if (car) {
    res.send(car);
  } else {
    res.status(404).send({
      error: "Car not found",
    });
  }
});

// atsiuncia {make, model, color}
// gauna {id, make, model, color}
app.post("/cars", (req, res) => {
  const car = req.body;
  if (car.make && car.model && car.color) {
    const newCar = { ...car, id: Date.now() };
    cars.push(newCar);
    res.send(newCar);
  } else {
    res.status(400).send({
      error: "Invalid request",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
