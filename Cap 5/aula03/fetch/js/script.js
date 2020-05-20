window.addEventListener('load', () => {
  doFetch();
  doFetchAsync();
  console.log('Antes da promise');

  console.log('Depois na promise');
  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();
});

function doFetch() {
  fetch('https://api.github.com/users/rrgomide')
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro de requisição');
    });
}

async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/rrgomide');
  const data = await res.json();
  console.log(data);
}

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = `${data.name} ${data.login}`;
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por 0');
    }
    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(12, 0)
    .then((result) => console.log(result))
    .catch((erroMessage) => console.log('Falha na divisão. ' + erroMessage));
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}
