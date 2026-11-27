// @ts-check

// TODO : importer createArtifact et artifactLabel depuis ../fiches-artefacts/artefacts.js
// TODO : importer isArchiveCode et normalizeArtifactName depuis ../inventaire-archives/inventaire.js

/**
 * Transforme une ligne du registre en fiche d'artefact.
 */
export function parseEntry(line) {
  // TODO
}

/**
 * Construit le registre à partir d'un texte de plusieurs lignes.
 */
export function buildRegistry(text) {
  // TODO
}

/**
 * Sélectionne et trie les artefacts les plus puissants, sans modifier le registre.
 */
export function strongestArtifacts(registry, minPower = 0) {
  // TODO
}

/**
 * Construit les libellés de tous les artefacts.
 */
export function registryLabels(registry) {
  // TODO
}

/**
 * Calcule la puissance totale du registre.
 */
export function totalPower(registry) {
  // TODO
}

/**
 * Regroupe les noms des artefacts par niveau de puissance.
 */
export function groupByPowerLevel(registry) {
  // TODO
}

/**
 * Recherche un artefact par son nom, sans tenir compte des majuscules ni des espaces externes.
 */
export function findByName(registry, name) {
  // TODO
}
