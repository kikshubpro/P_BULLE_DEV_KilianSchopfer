// @ts-check

/**
 * Valide une quantité d'énergie.
 * @param {number} energy
 * @returns {number}
 */
export function validateEnergy(energy) {
  if (energy < 0) {
    throw new Error("Énergie invalide");
  } else {
    return energy;
  }
}

/**
 * Vérifie une énergie sans propager l'exception.
 * @param {number} energy
 * @returns {string}
 */
export function safeEnergyCheck(energy) {
  try {
    validateEnergy(energy);
    return "Énergie valide";
  } catch {
    return "Énergie invalide";
  }
}

/**
 * Valide un code de porte autorisé.
 * @param {string} code
 * @returns {string}
 */
export function validateGateCode(code) {
  switch (code) {
    case "ALPHA":
      return "ALPHA";
    case "BETA":
      return "BETA";
    case "OMEGA":
      return "OMEGA";
    default:
      throw new Error("Code inconnu");
  }
}

/**
 * Vérifie un code de porte sans propager l'exception.
 * @param {*} code
 * @returns {string}
 */
export function safeGateCheck(code) {
  try {
    validateGateCode(code);
    return "Code accepté";
  } catch {
    return "Code refusé";
  }
}

/**
 * Compte les tentatives valides représentées par `A` ou `B`.
 * @param {string} text
 * @returns {number}
 */
export function countValidAttempts(text) {
  let count = 0;
  for (const letter of text) {
    letter == "A" || letter == "B" ? count++ : false;
  }
  return count;
}

/**
 * Compte les tentatives effectuées jusqu'au troisième `X` ou à la fin.
 * @param {string} sequence
 * @returns {number}
 */
export function attemptsBeforeLock(sequence) {
  let errors = 0;
  let i = 0;
  for (i; i < sequence.length; i++) {
    if (errors < 3) {
      sequence[i] == "X" ? errors++ : false;
    } else {
      return i;
    }
  }
  return i;
}
