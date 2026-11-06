// @ts-check

/**
 * Calcule la quantité d'énergie manquante.
 *
 * @param {*} maxEnergy
 * @param {*} currentEnergy
 * @returns
 */
export function missingEnergy(maxEnergy, currentEnergy) {
  return Number(maxEnergy - currentEnergy);
}

/**
 * Calcule le pourcentage d'énergie disponible.
 *
 * @param {*} maxEnergy
 * @param {*} currentEnergy
 * @returns
 */
export function energyPercentage(maxEnergy, currentEnergy) {
  return Number((currentEnergy / maxEnergy) * 100);
}

/**
 * Calcule l'énergie disponible après une recharge.
 *
 * @param {*} currentEnergy
 * @param {*} recharge
 * @returns
 */
export function energyAfterRecharge(currentEnergy, recharge) {
  return Number(currentEnergy + recharge);
}

/**
 * Indique si le générateur possède au moins 500 unités d'énergie.
 *
 * @param {*} currentEnergy
 * @returns
 */
export function isGeneratorReady(currentEnergy) {
  return Boolean(currentEnergy >= 500 ? true : false);
}

/**
 * Construit le message d'état du générateur.
 *
 * @param {*} name
 * @param {*} currentEnergy
 * @returns
 */
export function generatorStatus(name, currentEnergy) {
  return String(name + " possède " + currentEnergy + " unités d'énergie.");
}
