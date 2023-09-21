class RequestCounterManager {
  static #counter = 0;
  static #response = 0;
  /**
   * Get the current value of the request counter.
   * @returns {number} The current value of the counter.
   */
  static getCounter() {
    return RequestCounterManager.#counter;
  }

  /**
   * Get the current value of the response counter.
   * @returns {number} The current value of the counter.
   */
  static getResponse() {
    return RequestCounterManager.#response;
  }

  /**
   * Increment the response counter by one.
   */
  static incrementResponse() {
    RequestCounterManager.#response++;
  }
  /**
   * Increment the request counter by one.
   */
  static incrementCounter() {
    RequestCounterManager.#counter++;
  }

  static pendingRequests() {
    return RequestCounterManager.#counter - RequestCounterManager.#response;
  }
}

module.exports = RequestCounterManager;
