class IntervalManager {
  constructor() {
    if (IntervalManager.instance) {
      return IntervalManager.instance;
    }

    this.intervalIds = [];
    IntervalManager.instance = this;
  }

  addIntervalId(intervalId) {
    this.intervalIds.push(intervalId);
  }

  getIntervalIds() {
    return this.intervalIds;
  }
}

const intervalManager = new IntervalManager();

module.exports = intervalManager;
