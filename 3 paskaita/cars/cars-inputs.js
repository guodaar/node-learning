const form = document.querySelector("form");
const make = document.querySelector("#make");
const model = document.querySelector("#model");
const color = document.querySelector("#color");

const carID = Math.floor(Math.random() * 1000) + 1;

form.addEventListener("submit", (e) => {
  saveCar().then((car) => {
    console.log(car);
  });
});

async function saveCar() {
  try {
    const response = await fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        make: make.value,
        model: model.value,
        color: color.value,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
