const form = document.querySelector('.users-form');
const name = document.querySelector('#name');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const select = document.querySelector('#service');
const cancelBtn = document.querySelector('#cancel');

const allMemberships = [];

const selectOptions = (title, id) => {
  const memberOption = document.createElement('option');
  memberOption.value = id;
  memberOption.textContent = title;

  select.appendChild(memberOption);
};

async function getMembership() {
  try {
    const response = await fetch('http://localhost:3000/memberships');
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

getMembership().then((service) => {
  allMemberships.push(...service);
  allMemberships.forEach((item) => {
    selectOptions(item.name, item._id);
  });
});

async function saveUser() {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        email: email.value,
        service_id: select.value,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('submit', () => {
  saveUser().then((user) => {
    console.log(user);
  });
});

cancelBtn.addEventListener('click', () => {
  form.reset();
});
