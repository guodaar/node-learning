const form = document.querySelector('.services-form');
const name = document.querySelector('#name');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const cancelBtn = document.querySelector('#cancel');

async function saveService() {
  try {
    const response = await fetch('http://localhost:3000/memberships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        price: +price.value,
        description: description.value,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('submit', () => {
  saveService().then((service) => {
    console.log(service);
  });
});

cancelBtn.addEventListener('click', () => {
  form.reset();
});
