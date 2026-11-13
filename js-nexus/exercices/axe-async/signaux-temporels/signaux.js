// @ts-check

/**
 * Exécute un callback après un délai.
 *
 * @param {*} callback
 * @param {*} delay
 */
export function runLater(callback, delay) {
  setTimeout(() => {
    callback();
  }, delay);
}

/**
 * Transmet un message à un callback après un délai.
 *
 * @param {string} message
 * @param {number} delay
 * @param {function} callback
 */
export function sendSignal(message, delay, callback) {
  setTimeout(() => {
    callback(message);
  }, delay);
}

/**
 * Double une valeur puis la transmet à un callback après un délai.
 *
 * @param {number} value
 * @param {number} delay
 * @param {function} callback
 */
export function doubleLater(value, delay, callback) {
  setTimeout(() => {
    callback(value * 2);
  }, delay);
}

/**
 * Construit un statut puis le transmet après un délai.
 *
 * @param {string} name
 * @param {number} delay
 * @param {function} callback
 */
export function delayedStatus(name, delay, callback) {
  setTimeout(() => {
    callback(name + " prêt");
  }, delay);
}
