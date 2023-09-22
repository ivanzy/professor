class RequestCounterManager {
  static #counter = 0;
  static #response = 0;
  static #error = 0;
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
   * Get the current value of the errors counter.
   * @returns {number} The current value of the counter.
   */
  static getErrors() {
    return RequestCounterManager.#error;
  }

  /**
   * Increment the errors counter by one.
   */
  static incrementErrors() {
    RequestCounterManager.#error++;
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
  static reset() {
    RequestCounterManager.#counter = 0;
    RequestCounterManager.#response = 0;
  }
}

module.exports = RequestCounterManager;
