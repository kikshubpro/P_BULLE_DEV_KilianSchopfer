// @ts-check

/**
 * Convertit une valeur en nombre.
 * @param {any} value
 * @returns {number}
 */
export function convertCode(value) {
  return Number(value);
}

/**
 * Compare deux valeurs avec l'égalité souple.
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
export function sameCodeLoose(value1, value2) {
  return value1 == value2;
}

/**
 * Compare deux valeurs avec l'égalité stricte.
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
export function sameCodeStrict(value1, value2) {
  return value1 === value2;
}

/**
 * Indique si un code est pair.
 * @param {number} code
 * @returns {boolean}
 */
export function isEvenCode(code) {
  return code % 2 == 0;
}

/**
 * Indique si la conversion de la valeur produit NaN.
 * @param {any} value
 * @returns {boolean}
 */
export function isInvalidCode(value) {
  return isNaN(value);
}
