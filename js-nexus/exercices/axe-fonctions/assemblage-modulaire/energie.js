// @ts-check

/**
 * Calcule une énergie en ajoutant un bonus.
 * @param {number} base
 * @param {number} bonus
 * @returns {number}
 */
export function calculateEnergy(base, bonus = 0) {
  return base + bonus;
}

/**
 * Multiplie une énergie par un facteur.
 * @param {number} energy
 * @param {number} factor
 * @returns {number}
 */
export function multiplyEnergy(energy, factor = 2) {
  return energy * factor;
}
