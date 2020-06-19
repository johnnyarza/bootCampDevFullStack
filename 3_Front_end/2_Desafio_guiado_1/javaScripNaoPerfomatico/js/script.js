window.addEventListener('load', start);

const clickArray = [];

function start() {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
  console.log('DOM carregado');
}

function handleButtonClick() {
  clickArray.push(getNewTimeStamp());
  render();
}

function render() {
  const ul = document.querySelector('#data');
  ul.innerHTML = '';
  let lis = '';
  clickArray.forEach((item) => {
    lis += `<li>${item}</li>`;
  });
  ul.innerHTML = lis;

  document.title = `JS nao perfomatico (${clickArray.length})`;
}
