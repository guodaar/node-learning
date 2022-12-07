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

// app.get("/cars/:id", (req, res) => {

// });

app.post("/cars", (req, res) => {
  const car = req.body;
  if (car.make && car.model && car.color) {
    const newCar = { ...car, id: Math.floor(Math.random() * 1000) + 1 };
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
