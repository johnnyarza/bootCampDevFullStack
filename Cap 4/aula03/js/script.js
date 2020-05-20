window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );

  const marriedWoman = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  const marriedPeople = [...marriedMen, ...marriedWoman, { msg: 'oi' }];

  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2, 1000));
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function doDestructuring() {
  const first = people.results[0];
  // sem destr.
  // const username = first.login.username;
  // const password = first.login.password;

  //com destr.
  const { username, password } = first.login;

  console.log(username);
  console.log(password);
}
