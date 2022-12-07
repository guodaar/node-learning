////EXPRESS IR CORS////
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = 3000;

// app.use(cors());

// const cars = ["BMW", "Porsche", "Audi"];

// app.get("/", (req, res) => {
//   res.send(cars);
// });

// app.listen(port, () => {
//   console.log(`Server is running on ${port} port`);
// });

///UZDUOTIS SU NODEMON///
const express = require("express");
const nodemon = require("nodemon");
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const users = ["Alex", "Rose", "Megan"];

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.get("/users", function (req, res) {
//   res.sendFile(__dirname + "/names.html");
// });

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:firstLetter", (req, res) => {
  const firstLetter = req.params.firstLetter;
  let filteredNames = [];
  users.forEach((user, index, array) => {
    if (user.startsWith(`${firstLetter.toLocaleUpperCase()}`)) {
      console.log(user);
      filteredNames.push(user);
    }
  });
  res.send(filteredNames);
});

app.post("/users", (req, res) => {
  let newUser = req.body.name;
  names.push(newUser);
  console.log(names);
  res.send(names);
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
