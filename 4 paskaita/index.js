require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const users = db.data;
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  res.send(users);
});

function capitalize(car) {
  return car.charAt(0).toUpperCase() + car.slice(1);
}

app.get('/users/usersByCar/:car', (req, res) => {
  const car = req.params.car;
  const filteredUser = users.filter((user) => user.car === capitalize(car));
  if (filteredUser.length) {
    res.send(filteredUser);
    console.log(filteredUser);
  } else {
    res.status(404).send({
      error: 'No users found',
    });
  }
});

app.get('/users/usersById/:id', (req, res) => {
  const id = +req.params.id;
  const filteredUser = users.find((user) => user.id === id);
  if (filteredUser) {
    res.send(filteredUser);
  } else {
    res.status(404).send({
      error: 'User not found',
    });
  }
});

app.get('/users/userEmails', (req, res) => {
  const allEmails = [];
  users.forEach((user) => allEmails.push(user.email));
  res.send(allEmails);
});

app.get('/users/femaleUsers/names', (req, res) => {
  const femaleNames = [];
  const femaleUsers = users.filter((user) => user.gender === 'Female');
  console.log(femaleUsers);
  femaleUsers.forEach((user) =>
    femaleNames.push(`${user.first_name} ${user.last_name}`),
  );
  res.send(femaleNames);
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
