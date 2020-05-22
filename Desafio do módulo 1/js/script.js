let users = [];
let userList = null;
window.addEventListener('load', () => {
  let searchButton = document.querySelector('#search-button');
  userList = document.querySelector('#user-list');
  searchButton.addEventListener('click', onSearchBtClick);
});

function onSearchBtClick() {
  fetchUsers();
}

function render() {
  let usersHTML = '<div>';
  users.forEach((user) => {
    const { firstName, lastName, picture, age, gender } = user;
    const userHTML = `
    <div>
    <img src="${picture}" alt="${firstName}">
    </div>
    
    <div> 
    ${firstName} ${lastName}, ${age} anos
    </div>
    `;
    usersHTML += userHTML;
  });
  usersHTML += '</div>';
  userList.innerHTML = usersHTML;
}

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const data = await res.json();
  users = data.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      firstName: name.first,
      lastName: name.last,
      picture: picture.large,
      age: dob.age,
      gender: gender,
    };
  });
  render();
}
