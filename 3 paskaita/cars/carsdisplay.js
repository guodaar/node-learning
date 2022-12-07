const allCars = [];

async function getCars() {
  try {
    const response = await fetch("http://localhost:3000/cars");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
getCars().then((car) => {
  allCars.push(...car);
  allCars.forEach((car) => {
    car;
  });
  console.log(allCars);
  drawAllCars(allCars);
});

// Draw car

const tbody = document.querySelector(".cars-list");

function drawCar(car) {
  const row = document.createElement("tr");
  const id = document.createElement("td");
  const make = document.createElement("td");
  const model = document.createElement("td");
  const color = document.createElement("td");

  make.textContent = `${car.make}`;
  model.textContent = `${car.model}`;
  color.textContent = `${car.color}`;
  id.textContent = `${car.id}`;

  row.appendChild(id);
  row.appendChild(make);
  row.appendChild(model);
  row.appendChild(color);
  tbody.appendChild(row);
}

function drawAllCars(arr) {
  tbody.innerHTML = null;
  arr.forEach((element) => {
    drawCar(element);
  });
}
