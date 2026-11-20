// @ts-check

export const UNIVERSITIES = [
  "Académie Babbage",
  "Institut Lovelace",
  "Université Hopper",
  "École Dijkstra",
  "Collège Von Neumann",
];

export const MASTER_REQUIRED = ["Institut Lovelace", "École Dijkstra"];

/**
 * Indique si une université est connue.
 * @param {string} university
 * @returns {boolean}
 */
export function isKnownUniversity(university) {
  for (let i = 0; i < UNIVERSITIES.length; i++) {
    if (university == UNIVERSITIES[i]) {
      return true;
    }
  }
  return false;
}

/**
 * Convertit un titre en niveau numérique.
 */
/**
 *
 * @param {string} title
 * @returns {number}
 */
export function titleLevel(title) {
  switch (title) {
    case "Master":
      return 2;
    case "Bachelor":
      return 1;
    default:
      return 0;
  }
}

/**
 * Indique si une université exige un Master.
 * @param {string} university
 * @returns {boolean}
 */
export function requiresMaster(university) {
  for (let i = 0; i < MASTER_REQUIRED.length; i++) {
    if (university == MASTER_REQUIRED[i]) {
      return true;
    }
  }
  return false;
}

/**
 * Indique si un visiteur est considéré comme fiable.
 * @param {string} university
 * @param {string} title
 * @returns {boolean}
 */
export function isTrusted(university, title) {
  return isKnownUniversity(university) &&
    titleLevel(title) >= 1 &&
    ((requiresMaster(university) && title === "Master") ||
      !requiresMaster(university))
    ? true
    : false;
}

/**
 * Construit le message d'accueil selon l'université et le titre.
 * @param {string} university
 * @param {string} title
 * @returns {string}
 */
export function welcomeMessage(university, title) {
  if (!isKnownUniversity(university)) {
    return "Université inconnue";
  } else if (titleLevel(title) === 0) {
    return "Titre inconnu";
  } else if (requiresMaster(university) && title !== "Master") {
    return "Master requis";
  } else {
    return "Bienvenue dans la Citadelle";
  }
}

/**
 * Vérifie que tous les visiteurs sont fiables.
 * @param {string} universities
 * @param {string} titles
 * @returns {boolean}
 */
export function allTrusted(universities, titles) {
  for (let i = 0; i < universities.length; i++) {
    if (!isTrusted(universities[i], titles[i])) {
      return false;
    }
  }
  return true;
}
