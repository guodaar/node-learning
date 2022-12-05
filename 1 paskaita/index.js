const casual = require("casual");

console.log(casual.city);

const randomNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
casual.integer((from = 0), (to = 10));

console.log(`${casual.city}, ${casual.integer((from = 0), (to = 10))}`);
console.log(`${casual.name_prefix} ${casual.first_name} ${casual.last_name}`);
