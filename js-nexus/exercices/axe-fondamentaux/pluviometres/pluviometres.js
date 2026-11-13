// @ts-check

/**
 * Convertit un relevé en nombre.
 * @param {*} value
 * @returns {number}
 */
export function readRainfall(value) {
  return Number(value);
}

/**
 * Additionne deux relevés après les avoir convertis en nombres.
 * @param {*} morning
 * @param {*} evening
 * @returns {number}
 */
export function totalRainfall(morning, evening) {
  return Number(morning) + Number(evening);
}

/**
 * Indique si l'heure correspond à un relevé automatique (toutes les 3 heures).
 * @param {number} hour
 * @returns {boolean}
 */
export function isScheduledHour(hour) {
  return hour % 3 == 0;
}

/**
 * Indique si la conversion du relevé produit NaN.
 * @param {*} value
 * @returns {boolean}
 */
export function isFaultyReading(value) {
  return isNaN(Number(value));
}

/**
 * Compare strictement deux relevés après conversion en nombres.
 * @param {*} manual
 * @param {*} automatic
 * @returns {boolean}
 */
export function isConfirmedReading(manual, automatic) {
  return Number(manual) == Number(automatic);
}
