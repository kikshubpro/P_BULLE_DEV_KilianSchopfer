// @ts-check

// TODO : importer stabilizeEnergy depuis ../catalyseur/catalyseur.js
// TODO : importer formatResult depuis ../assemblage-modulaire/messages.js

/**
 * Calcule les ingrédients qui manquent pour réaliser une recette.
 */
export function missingIngredients(stock, recipe) {
  // TODO
}

/**
 * Indique si une recette peut être réalisée avec le stock.
 */
export function canCraft(stock, recipe) {
  // TODO
}

/**
 * Réalise une recette : consomme le stock et retourne le produit obtenu.
 */
export function craft(stock, recipe, factor = 1) {
  // TODO
}

/**
 * Calcule le stock restant après une recette, sans modifier le stock reçu.
 */
export function previewStock(stock, recipe) {
  // TODO
}

/**
 * Réalise une recette plusieurs fois, tant que le stock le permet.
 */
export function craftBatch(stock, recipe, quantity) {
  // TODO
}

/**
 * Construit le rapport d'une production.
 */
export function batchReport(recipe, batch) {
  // TODO
}
