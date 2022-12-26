const allServices = [];
const servicesCont = document.querySelector('.services-container');

async function getServices() {
  try {
    const response = await fetch('http://localhost:3000/memberships');
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function drawService(service) {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const deleteBtn = document.createElement('button');

  title.textContent = `${service.price} ${service.name}`;
  description.textContent = `${service.description}`;

  div.appendChild(title);
  div.appendChild(description);
  servicesCont.appendChild(div);
}

function drawAllServices(arr) {
  servicesCont.innerHTML = null;
  arr.forEach((element) => {
    drawService(element);
  });
}

getServices().then((service) => {
  allServices.push(...service);
  drawAllServices(allServices);
});
