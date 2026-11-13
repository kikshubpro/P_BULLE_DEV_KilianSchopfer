// @ts-check

/**
 * Additionne les numéros de ronde de 1 au nombre indiqué.
 *
 * @param {number} numberOfRounds
 * @returns {number}
 */
export function sumRounds(numberOfRounds) {
  let sum = 0;
  for (let i = 0; i < numberOfRounds; i++) {
    sum += i + 1;
  }
  return sum;
}

/**
 * Compte le nombre de caractères d'un code.
 *
 * @param {string} code
 * @returns {number}
 */
export function countSymbols(code) {
  let count = 0;
  for (const element of code) {
    count++;
  }
  return count;
}

/**
 * Compte le nombre de caractères `X` dans un code.
 *
 * @param {string} code
 * @returns {number}
 */
export function countX(code) {
  let count = 0;
  for (const element of code) {
    if (element == "X") {
      count++;
    }
  }
  return count;
}

/**
 * Calcule le nombre de tours complets possibles avant épuisement de l'énergie.
 *
 * @param {number} energy
 * @param {number} consumption
 * @returns {number}
 */
export function turnsBeforeEmpty(energy, consumption) {
  let count = 0;
  while (energy >= consumption) {
    energy -= consumption;
    count++;
  }
  return count;
}

/**
 * Retourne la première ronde pour laquelle le total dépasse une limite.
 *
 * @param {number} limit
 * @returns {number}
 */
export function firstRoundAbove(limit) {
  let sum = 1;
  let roundNumber = 1;
  while (sum <= limit) {
    sum += sum;
    roundNumber++;
  }
  return roundNumber;
}
