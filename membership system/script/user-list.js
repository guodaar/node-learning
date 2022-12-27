let allUsers = [];
const usersCont = document.querySelector('.users-container');
const sort = document.querySelector('.sort');
const sortOrder = document.querySelector('#sort-type');
let order = 'asc';

// Get from API
async function getUsers(order) {
  try {
    const response = await fetch('http://localhost:3000/users/' + order);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function drawUser(user) {
  const card = document.createElement('div');
  const name = document.createElement('h3');
  const email = document.createElement('p');
  const membership = document.createElement('p');
  const emailContent = document.createElement('span');
  const membershipContent = document.createElement('span');

  card.setAttribute('class', 'user-card');

  name.textContent = `${user.name} ${user.surname}`;
  email.textContent = 'Email Address: ';
  emailContent.textContent = `${user.email}`;
  membership.textContent = 'Membership: ';
  membershipContent.textContent = `${user.membership_name}`;

  email.appendChild(emailContent);
  membership.appendChild(membershipContent);
  card.appendChild(name);
  card.appendChild(email);
  card.appendChild(membership);
  usersCont.appendChild(card);
}

function drawAllServices(arr) {
  usersCont.innerHTML = null;
  arr.forEach((element) => {
    drawUser(element);
  });
}

sort.addEventListener('click', () => {
  if (sortOrder.textContent === 'ASC') {
    sortOrder.textContent = 'DESC';
    order = 'desc';
  } else {
    sortOrder.textContent = 'ASC';
    order = 'asc';
  }
  getUsers(order).then((user) => {
    let allUsers = [];
    allUsers.push(...user);
    drawAllServices(allUsers);
  });
});

getUsers(order).then((user) => {
  allUsers.push(...user);
  drawAllServices(allUsers);
});
