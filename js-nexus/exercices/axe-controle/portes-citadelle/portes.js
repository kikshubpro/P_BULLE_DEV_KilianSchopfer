// @ts-check

/**
 * Retourne le message d'accès correspondant au niveau.
 * @param {number} level
 * @returns {string}
 */
export function accessMessage(level) {
  return level >= 5 ? "Accès autorisé" : "Accès refusé";
}

/**
 * Retourne l'état textuel d'une porte.
 * @param {boolean} isOpen
 * @returns {string}
 */
export function doorStatus(isOpen) {
  return isOpen ? "Ouverte" : "Fermée";
}

/**
 * Retourne le nom de la zone correspondant à un code.
 * @param {string} code
 * @returns {string}
 */
export function zoneName(code) {
  switch (code) {
    case "N":
      return "Les Fondations";
    case "E":
      return "Les Archives";
    case "SE":
      return "La Forge";
    case "SO":
      return "La Citadelle";
    case "O":
      return "La Faille";
    default:
      return "Zone inconnue";
  }
}

/**
 * Détermine le niveau d'alerte selon l'énergie disponible.
 * @param {number} energy
 * @returns {string}
 */
export function alertLevel(energy) {
  if (energy < 20) {
    return "CRITIQUE";
  } else if (energy <= 49) {
    return "FAIBLE";
  } else if (energy <= 79) {
    return "STABLE";
  } else {
    return "OPTIMAL";
  }
}
