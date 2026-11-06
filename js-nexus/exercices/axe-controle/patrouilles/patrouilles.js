// @ts-check

/**
 * Additionne les numéros de ronde de 1 au nombre indiqué.
 *
 * @param {*} numberOfRounds
 * @returns
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
 * @param {*} code
 * @returns
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
 * @param {*} code
 * @returns
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
 * @param {*} energy
 * @param {*} consumption
 * @returns
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
 * @param {*} limit
 * @returns
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
