export class State {

  static #state = {
    activeChampionship: {},
    history: {},
    nextHistoryID: 0
  }

  static hasActiveChampionship() {
    return Object.keys(this.#state.activeChampionship).length !== 0;
  }

  static getActiveChampionship() {
    return this.#state.activeChampionship;
  }

  static setActiveChampionship(type, name, players) {
    this.#state.activeChampionship = {
      type: type,
      name: name,
      players: players
    }
  }

  static removeActiveChampionship() {
    this.#state.activeChampionship = {};
  }

  static addHistoryChampionship(championship) {
    const idString = this.#state.nextHistoryID.toString();
    this.#state.nextHistoryID++;
    this.#state.history[idString] = championship;
    console.log(this.#state.history);
    return idString;
  }

  static removeHistoryChampionship(historyID) {
    return 0;
  }
}