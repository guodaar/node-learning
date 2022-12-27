const allServices = [];
const servicesCont = document.querySelector('.services-container');

// Get from API
async function getServices() {
  try {
    const response = await fetch('http://localhost:3000/memberships');
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Delete from API
async function deleteService(id) {
  try {
    const response = await fetch('http://localhost:3000/memberships/' + id, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function drawService(service, index) {
  const card = document.createElement('div');
  const titleWrapper = document.createElement('div');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const deleteBtn = document.createElement('button');
  const btnContainer = document.createElement('div');

  card.setAttribute('class', 'service-card');
  titleWrapper.setAttribute('class', 'title-container');
  btnContainer.setAttribute('class', 'btn-container');
  deleteBtn.setAttribute('id', 'delete-btn');

  title.textContent = `$${service.price} ${service.name}`;
  description.textContent = `${service.description}`;
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  // Delete button
  const id = service._id;
  deleteBtn.addEventListener('click', () => {
    deleteService(id).then((item) => {
      console.log(item);
    });
    allServices.splice(index, 1);
    drawAllServices(allServices);
  });

  btnContainer.appendChild(deleteBtn);
  titleWrapper.appendChild(title);
  titleWrapper.appendChild(description);
  card.appendChild(titleWrapper);
  card.appendChild(btnContainer);
  servicesCont.appendChild(card);
}

function drawAllServices(arr) {
  servicesCont.innerHTML = null;
  arr.forEach((element, index) => {
    drawService(element, index);
  });
}

getServices().then((service) => {
  allServices.push(...service);
  drawAllServices(allServices);
});
