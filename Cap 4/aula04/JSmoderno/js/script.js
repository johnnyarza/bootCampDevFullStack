var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName'); //foi colocado aqui pq aqui é garantido que pagina foi carregada

  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  var form = document.querySelector('form');
  form.addEventListener('submit', (event) => event.preventDefault());
}

function updateName(newName) {
  globalNames[currentIndex] = newName;
}

function insertName(newName) {
  //globalNames.push(newName);
  globalNames = [...globalNames, newName];
}

function activateInput() {
  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== '';
    if (!hasText) {
      clearInput(inputName);
      return;
    }
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput(inputName);
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      //globalNames.splice(index, 1);
      //globalNames = globalNames.filter((name, i) => {
      // if (i === index) {
      //   return false;
      // }
      // return true;
      // return i !== index;
      //});
      globalNames = globalNames.filter((_, i) => i !== index);
      render();
    }
    var button = document.createElement('button');

    button.classList.add('deleteButton'); //aqui nao precisa do .
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  //Criar ul
  //Fazer n li's, conforme tamanho do globalNames
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput(inputName);
}

const clearInput = (input) => {
  input.value = '';
  input.focus();
};
