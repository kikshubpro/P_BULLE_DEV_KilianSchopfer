// @ts-check

/**
 * Calcule la quantité d'énergie manquante.
 *
 * @param {number} maxEnergy
 * @param {number} currentEnergy
 * @returns {number}
 */
export function missingEnergy(maxEnergy, currentEnergy) {
  return Number(maxEnergy - currentEnergy);
}

/**
 * Calcule le pourcentage d'énergie disponible.
 *
 * @param {number} maxEnergy
 * @param {number} currentEnergy
 * @returns {number}
 */
export function energyPercentage(maxEnergy, currentEnergy) {
  return (currentEnergy / maxEnergy) * 100;
}

/**
 * Calcule l'énergie disponible après une recharge.
 *
 * @param {number} currentEnergy
 * @param {number} recharge
 * @returns {number}
 */
export function energyAfterRecharge(currentEnergy, recharge) {
  return currentEnergy + recharge;
}

/**
 * Indique si le générateur possède au moins 500 unités d'énergie.
 *
 * @param {number} currentEnergy
 * @returns {boolean}
 */
export function isGeneratorReady(currentEnergy) {
  return currentEnergy >= 500;
}

/**
 * Construit le message d'état du générateur.
 *
 * @param {string} name
 * @param {number} currentEnergy
 * @returns {string}
 */
export function generatorStatus(name, currentEnergy) {
  return name + " possède " + currentEnergy + " unités d'énergie.";
}
