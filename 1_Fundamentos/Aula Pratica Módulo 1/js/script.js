let rangeIntervalMax = null;
let rangeIntervalMin = null;
let inputRange = null;
let inputFrequency = null;
let divContent = null;

window.addEventListener('load', () => {
  rangeIntervalMax = document.querySelector('#range-interval-max');
  rangeIntervalMin = document.querySelector('#range-interval-min');
  inputRange = document.querySelector('#input-range');
  inputFrequency = document.querySelector('#input-frequency');
  divContent = document.querySelector('#div-content');

  inputRange.addEventListener('input', rangeInputEvent);

  setRangeInterval();
});

function rangeInputEvent(event) {
  let value = event.target.value;
  inputFrequency.value = value;
  let foundPodcast = podcasts.feed.results.find(
    (podcast) => podcast.id === value
  );
  render(foundPodcast);
}

function render(foundPodcast) {
  if (foundPodcast) {
    divContent.innerHTML = `
    <div><img class = "pulse" src="${foundPodcast.artworkUrl100}" alt="${foundPodcast.name}"></div>
    <div><h4>${foundPodcast.name}</h4></div>
    <div><h5>${foundPodcast.genres[0].name}</h5></div>
    `;
  } else {
    divContent.innerHTML = 'Nenhum podcast encontrado';
  }
}

function setRangeInterval() {
  let sortedPodcasts = podcasts.feed.results.sort((a, b) => {
    return a.id - b.id;
  });
  inputRange.min = sortedPodcasts[0].id;
  rangeIntervalMin.textContent = sortedPodcasts[0].id;
  inputRange.max = sortedPodcasts[sortedPodcasts.length - 1].id;
  rangeIntervalMax.textContent = sortedPodcasts[sortedPodcasts.length - 1].id;
}
