console.log('Trabalho prático módulo 01');

window.addEventListener('load', start);

function start() {
  var redRange = document.querySelector('#redRange');
  var redInput = document.querySelector('#redInput');
  var greenRange = document.querySelector('#greenRange');
  var greenInput = document.querySelector('#greenInput');
  var blueRange = document.querySelector('#blueRange');
  var blueInput = document.querySelector('#blueInput');
  updateColor();
  function redRangeValue(event) {
    redInput.value = event.target.value;
    updateColor(redInput.value, greenInput.value, blueInput.value);
  }
  function greenRangeValue(event) {
    greenInput.value = event.target.value;
    updateColor(redInput.value, greenInput.value, blueInput.value);
  }
  function blueRangeValue(event) {
    blueInput.value = event.target.value;
    updateColor(redInput.value, greenInput.value, blueInput.value);
  }

  rangeEventListener(
    redRange,
    greenRange,
    blueRange,
    redRangeValue,
    greenRangeValue,
    blueRangeValue
  );
  console.log('Página carregada');
}

function rangeEventListener(rang1, rang2, rang3, func1, func2, func3) {
  rang1.addEventListener('change', func1);
  rang2.addEventListener('change', func2);
  rang3.addEventListener('change', func3);
}

function updateColor(r = 0, g = 0, b = 0) {
  var div = document.querySelector('#rgbResult');
  div.style.backgroundColor = `rgb(${r},${g},${b})`;
}
