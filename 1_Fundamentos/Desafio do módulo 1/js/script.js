let users = [];
let allUsers = [];
let userList = null;
let statisticsList = null;
let userSummarizeTitle = null;
let searchUserInput = null;
let searchButton = null;
let numberFormat = null;

window.addEventListener('load', () => {
  searchButton = document.querySelector('#search-button');
  userList = document.querySelector('#user-list');
  userSummarizeTitle = document.querySelector('#user-summarize-title');
  searchUserInput = document.querySelector('#search-user-input');
  statisticsList = document.querySelector('#statistics-list');

  searchButton.addEventListener('click', onSearchBtClick);
  searchUserInput.addEventListener('input', searchInputAction);
  numberFormat = Intl.NumberFormat('pt-BR');

  fetchUsers();
});

function searchInputAction() {
  // $('#search-button')
  //   .removeClass('waves-effect waves-light btn disabled')
  //   .addClass('waves-effect waves-light btn');
  if (
    searchUserInput.value.length !== 0 &&
    searchButton.classList.contains('disabled')
  ) {
    searchButton.classList.remove('disabled');
  } else if (
    searchUserInput.value.length === 0 &&
    !searchButton.classList.contains('disabled')
  ) {
    searchButton.classList.add('disabled');
  }
}

function onSearchBtClick(event) {
  searchUsers();
  render();
}

function searchUsers() {
  users = filterUsers();
}

function render() {
  setStatistics();
  setUserResults();
  setUserSummarizeTitle(users.length);
  setUserResults();
}

function setStatistics() {
  statisticsList.innerHTML = ``;
  countMales();
  countFemales();
  let sum = sumAge();
  ageMed(sum);
}

function countMales() {
  let count = users.filter((user) => user.gender === 'male').length;

  statisticsList.innerHTML += `
  <div>Sexo masculino: <span>${count}</span></div>
  `;
}

function countFemales() {
  let count = users.filter((user) => user.gender === 'female').length;
  statisticsList.innerHTML += `
  <div>Sexo feminino: <span>${count}</span></div>
  `;
}

function sumAge() {
  const sum = users.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  statisticsList.innerHTML += `
  <div>Soma das idades: <span>${sum}</span></div>`;
  return sum;
}
function ageMed(sum) {
  let med = (sum / users.length).toFixed(2);
  med = numberFormat.format(med);
  statisticsList.innerHTML += `<div>Média das idades: <span>${med}</span></div`;
}

function setUserResults() {
  let usersHTML = '<div>';

  users.forEach((user) => {
    const { firstName, lastName, picture, age, gender } = user;
    const userHTML = `
    <div class = 'user-list z-depth-2'>
      <div>
        <img src="${picture}" alt="${firstName}" class="circle">
      </div>
    
      <div> 
        <h6>${firstName} ${lastName}, ${age} anos</h6>
      </div>
    </div>
    `;
    usersHTML += userHTML;
  });
  usersHTML += '</div>';
  userList.innerHTML = usersHTML;
}

function filterUsers() {
  return allUsers.filter((user) => {
    return (user.firstName + ' ' + user.lastName)
      .toLowerCase()
      .includes(searchUserInput.value.toLowerCase());
  });
}

function setUserSummarizeTitle(length) {
  if (length > 0) {
    userSummarizeTitle.textContent = `${length} usuários encontrados`;
  } else if (length === 1) {
    userSummarizeTitle.textContent = `${length} usuário encontrado`;
  } else if (length === 0) {
    userSummarizeTitle.textContent = 'Nenhum usuário encontrado';
  }
}

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const data = await res.json();
  allUsers = data.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      firstName: name.first,
      lastName: name.last,
      picture: picture.large,
      age: dob.age,
      gender: gender,
    };
  });
}
