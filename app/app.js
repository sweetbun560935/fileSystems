// Imports
import { components } from './modules/components.js';
import { State } from './modules/State.js';


// DOM nodes

const dMain = document.getElementById('main-content');
const dHomeView = document.getElementById('home-view');
const dCreateView = document.getElementById('create-view');
const dChampionshipView = document.getElementById('championship-view');

const dCreateButton = document.getElementById('create-button');
const dCreateSubmitButton = document.getElementById('create-submit-button');
const dBackButton = document.getElementById('back-button');
const dChangeSettingsButton = document.getElementById('change-settings-button');
const dPauseButton = document.getElementById('pause-button');
const dAddPlayerButton = document.getElementById('add-player-button');
//const dRemoveButtons = document.querySelectorAll('.remove-button');

const dCreateForm = document.getElementById('create-form');
const dPlayerInputList = document.getElementById('player-input-list');
const dHistoryList = document.getElementById('history-list');


// Temporary elements for development

const tempChampionshipInfo = document.getElementById('temp-championship-info');


// Event Listeners

dCreateButton.addEventListener('click', (event) => {
  updateView('create');
  event.target.blur(); // removes focus
});

dBackButton.addEventListener('click', () => {
  updateView('home');
});

dCreateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  updateView('championship')
});

dChangeSettingsButton.addEventListener('click', () => {
  updateView('create');
});

dPauseButton.addEventListener('click', () => {
  updateView('home');
});

dAddPlayerButton.addEventListener('click', addPlayer);

document.querySelectorAll('.remove-button').forEach(dButton => {
  dButton.addEventListener('click', () => {
    dButton.parentElement.remove()
  })
})


// Functions

function updateView(newView) {
  switch (newView) {
    case 'home':
      setupHomeView();
      dHomeView.classList.remove('hidden');
      dCreateView.classList.add('hidden');
      dChampionshipView.classList.add('hidden');
      break;
    case 'create':
      setupCreateView();
      dHomeView.classList.add('hidden');
      dCreateView.classList.remove('hidden');
      dChampionshipView.classList.add('hidden');
      break;
    case 'championship':
      setupChampionshipView();
      dHomeView.classList.add('hidden');
      dCreateView.classList.add('hidden');
      dChampionshipView.classList.remove('hidden');
      break;
  }
}

function setupHomeView() {
  if (State.hasActiveChampionship()) {
    const historyID = State.addHistoryChampionship(State.getActiveChampionship());
    const historyElement = components.createHistoryListElement(State.getActiveChampionship().name, historyID);
    dHistoryList.appendChild(historyElement);
    State.removeActiveChampionship();
  }
}

function setupCreateView() {
  if (State.hasActiveChampionship()) {
    dCreateForm.querySelector('#ch-type-tournament').disabled = true;
    dCreateForm.querySelector('#ch-type-league').disabled = true;

    document.querySelectorAll('.remove-button').forEach(dButton => {
      dButton.disabled = true;
    });

    dAddPlayerButton.disabled = true;
    dCreateSubmitButton.textContent = 'Continue Championship';
    dBackButton.disabled = true;

  } else {
    const dRadioTournament = dCreateForm.querySelector('#ch-type-tournament');
    dRadioTournament.disabled = false;
    dRadioTournament.checked = true;
    dCreateForm.querySelector('#ch-type-league').disabled = false;
    dCreateForm.querySelector('#ch-name').value = '';
    dPlayerInputList.replaceChildren(components.createPlayerInputElement());
    dAddPlayerButton.disabled = false;
    dCreateSubmitButton.textContent = 'Generate Championship';
    dBackButton.disabled = false;
  }
}

function setupChampionshipView() {
  let formData = new FormData(dCreateForm);
  State.setActiveChampionship(formData.get('ch-type'), formData.get('ch-name'), formData.getAll('player'));
  tempChampionshipInfo.textContent = JSON.stringify(State.getActiveChampionship(), null, 2);
}

function addPlayer() {
  dPlayerInputList.appendChild(components.createPlayerInputElement());
}