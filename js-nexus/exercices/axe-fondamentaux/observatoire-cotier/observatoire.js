// @ts-check

/**
 * Retourne le type JavaScript de la donnée.
 * @param {*} value
 * @returns {string}
 */
export function dataType(value) {
  return typeof value;
}

/**
 * Indique si le comptage vaut undefined.
 * @param {*} count
 * @returns {boolean}
 */
export function isNotTransmitted(count) {
  return count === undefined;
}

/**
 * Indique si le comptage vaut null.
 * @param {*} count
 * @returns {boolean}
 */
export function isOffline(count) {
  return count === null;
}

/**
 * Indique si un comptage est disponible, c'est-à-dire
 * différent de undefined et de null.
 * @param {*} count
 * @returns {boolean}
 */
export function hasBirdCount(count) {
  return count !== null && count !== undefined;
}

/**
 * Additionne les deux comptages.
 * Un comptage indisponible compte pour 0.
 * @param {*} northCount
 * @param {*} southCount
 * @returns {number}
 */
export function totalBirds(northCount, southCount) {
  return (
    (northCount == undefined ? 0 : northCount) +
    (southCount == undefined ? 0 : southCount)
  );
}

/**
 * Indique si la hauteur est de type number et n'est pas NaN.
 * @param {*} height
 * @returns {boolean}
 */
export function isValidWaveHeight(height) {
  return !isNaN(height) && typeof height == "number";
}
