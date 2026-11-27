// @ts-check

import { calculateEnergy, multiplyEnergy } from "./energie";
import { formatResult } from "./messages";

/**
 * Crée une synthèse à partir d'une énergie de base et d'un bonus.
 * @param {string} name
 * @param {number} base
 * @param {number} bonus
 * @returns {string}
 */
export function createSynthesis(name, base, bonus = 0) {
  return formatResult(name, calculateEnergy(base, bonus));
}

/**
 * Crée une synthèse avec une énergie multipliée.
 * @param {string} name
 * @param {number} base
 * @param {number} factor
 * @returns {string}
 */
export function createBoostedSynthesis(name, base, factor = 2) {
  return formatResult(name, multiplyEnergy(base, factor));
}
