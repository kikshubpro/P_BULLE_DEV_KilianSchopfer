// @ts-check

// TODO : importer upgradeArtifact depuis ../fiches-artefacts/artefacts.js

/**
 * Coffre des Archives contenant un nombre limité d'artefacts.
 */
export class Vault {
  /**
   * Crée un coffre vide.
   */
  constructor(name, capacity) {
    // TODO
  }

  // TODO : getter count

  // TODO : getter totalPower

  // TODO : getter isFull

  // TODO : getter summary
}

/**
 * Range un artefact dans un coffre.
 * Le coffre reçu est modifié.
 */
export function storeArtifact(vault, artifact) {
  // TODO
}

/**
 * Retire un artefact d'un coffre et le retourne.
 * Le coffre reçu est modifié.
 */
export function retrieveArtifact(vault, id) {
  // TODO
}

/**
 * Remplace chaque artefact d'un coffre par une copie améliorée.
 * Le coffre reçu est modifié, les artefacts d'origine ne le sont pas.
 */
export function upgradeVault(vault, bonus) {
  // TODO
}

/**
 * Déplace un artefact d'un coffre à un autre.
 * Si le déplacement échoue, l'artefact reste dans le coffre de départ.
 */
export function moveArtifact(source, target, id) {
  // TODO
}

/**
 * Répartit des artefacts dans des coffres : chacun va dans le premier coffre qui a de la place.
 * Les coffres reçus sont modifiés.
 */
export function distributeArtifacts(artifacts, vaults) {
  // TODO
}
