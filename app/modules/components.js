// Functions creating different components for the app

export const components = {

  createPlayerInputElement() {

    const listItem = document.createElement('li');

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.name = 'player';
    textInput.value = '';

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.type = 'button';
    removeButton.textContent = 'x';

    removeButton.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    });

    listItem.appendChild(textInput);
    listItem.appendChild(removeButton);

    return listItem;
  },

  createHistoryListElement(championshipName, historyID) {

    const listItem = document.createElement('li');

    const historyButton = document.createElement('button');
    historyButton.type = 'button';
    historyButton.classList.add('history-button');
    historyButton.textContent = championshipName;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'x';

    const idElement = document.createElement('div');
    idElement.classList.add('hidden');
    idElement.textContent = historyID;

    listItem.appendChild(historyButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(idElement);

    return listItem;
  }
}

