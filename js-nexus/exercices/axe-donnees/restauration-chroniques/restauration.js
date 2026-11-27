// @ts-check

// TODO : importer Discovery et daysBetween depuis ../chroniques-nexus/chroniques.js

/**
 * Sauvegarde des découvertes dans une chaîne JSON.
 */
export function saveChronicle(discoveries) {
  // TODO
}

/**
 * Restaure des découvertes à partir d'une sauvegarde JSON.
 */
export function restoreChronicle(text) {
  // TODO
}

/**
 * Regroupe les noms des découvertes par année, dans l'ordre chronologique.
 */
export function timeline(discoveries) {
  // TODO
}

/**
 * Fusionne deux chroniques sans doublon.
 * En cas de doublon (même nom), la découverte la plus importante est conservée.
 */
export function mergeChronicles(first, second) {
  // TODO
}

/**
 * Ajoute une note aux découvertes citées.
 * Les découvertes reçues sont modifiées.
 */
export function annotate(discoveries, notes) {
  // TODO
}

/**
 * Retrouve la découverte la plus récente et son ancienneté.
 */
export function latestDiscovery(discoveries, today) {
  // TODO
}
