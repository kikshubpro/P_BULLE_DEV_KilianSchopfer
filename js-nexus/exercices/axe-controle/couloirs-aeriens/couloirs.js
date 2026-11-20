// @ts-check

export const MAX_DRONES_PER_CORRIDOR = 5;

/**
 * Valide une altitude autorisée.
 * @param {number} altitude
 * @returns {number}
 */
export function validateAltitude(altitude) {
  switch (altitude) {
    case 50:
      return altitude;
    case 100:
      return altitude;
    case 150:
      return altitude;
    default:
      throw new Error(`Altitude interdite : ${altitude} m`);
  }
}

/**
 * Compte les drones présents à une altitude.
 * @param {number[]} altitudes
 * @param {number} altitude
 * @returns {number}
 */
export function countAtAltitude(altitudes, altitude) {
  let count = 0;
  for (const alt of altitudes) {
    altitude === alt ? count++ : false;
  }
  return count;
}

/**
 * Vérifie qu'un couloir ne dépasse pas sa capacité.
 * @param {number[]} altitudes
 * @param {number} altitude
 * @returns {number}
 */
export function checkCorridor(altitudes, altitude) {
  if (countAtAltitude(altitudes, altitude) > MAX_DRONES_PER_CORRIDOR) {
    throw new Error(`Collision à ${altitude} m`);
  } else {
    return countAtAltitude(altitudes, altitude);
  }
}

/**
 * Vérifie les altitudes et la capacité de tous les couloirs.
 * @param {number[]} altitudes
 * @returns {string}
 */
export function checkAirspace(altitudes) {
  for (const altitude of altitudes) {
    if (!(validateAltitude(altitude) === altitude)) {
      throw new Error(`Altitude interdite : ${altitude} m`);
    }
  }
  for (const altitude of altitudes) {
    if (checkCorridor(altitudes, altitude) > MAX_DRONES_PER_CORRIDOR) {
      throw new Error(`Collision à ${altitude} m`);
    }
  }
  return "Espace aérien sûr";
}

/**
 * Produit un rapport sans propager les erreurs de validation.
 * @param {number[]} altitudes
 * @returns {string}
 */
export function airspaceReport(altitudes) {
  try {
    return checkAirspace(altitudes);
  } catch (error) {
    // @ts-ignore
    return `Alerte : ${error.message}`;
  }
}
