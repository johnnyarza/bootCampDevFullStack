window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });
  console.log(nameEmailArray);
  return nameEmailArray;
}

function doFilter() {
  let age = 50;
  const olderThan = people.results.filter((person) => {
    return person.dob.age > age;
  });
  console.log(olderThan);
}

function doForEach() {
  const mappedPeople = doMap();
  mappedPeople.forEach((person) => {
    person.nameSize = (
      person.name.title +
      person.name.first +
      person.name.last
    ).length;
  });
  console.log(mappedPeople);
}

function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  // console.log(totalAges);
  // let soma = 0;
  // for (let i = 0; i < people.results.length; i++) {
  //   soma += people.results[i].dob.age;
  // }
  // console.log(soma);
}

function doFind() {
  let estado = 'Minas gerais';
  const foundPerson = people.results.find((person) => {
    return estado.toLowerCase() === person.location.state.toLowerCase();
  });
  console.log(foundPerson);
}

function doSome() {
  // verifica se algum item atende o predicado
  let estado = 'amazonas';
  const found = people.results.some((person) => {
    return person.location.state.toUpperCase() === estado.toUpperCase();
  });
  console.log(found);
}

function doEvery() {
  // verifica se todos atendem o predicado
  const every = people.results.every((person) => {
    return person.nat === 'BR';
  });
  console.log(every);
}

function doSort() {
  const mappedPeople = people.results
    .map((person) => {
      return { name: person.name.first };
    })
    .filter((person) => {
      return person.name.startsWith('A');
    })
    .sort((a, b) => {
      //return a.name.localeCompare(b.name);
      //return a.name.length - b.name.length;
      return b.name.length - a.name.length;
    });

  console.log(mappedPeople);
}
