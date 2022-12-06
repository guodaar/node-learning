const casual = require("casual");

const randomNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
casual.integer((from = 0), (to = 10));

console.log(
  `City: ${
    casual.city
  }, random number (old method): ${randomNumber}, random number (new method): ${casual.integer(
    (from = 0),
    (to = 10)
  )}`
);
console.log(`${casual.name_prefix} ${casual.first_name} ${casual.last_name}`);
