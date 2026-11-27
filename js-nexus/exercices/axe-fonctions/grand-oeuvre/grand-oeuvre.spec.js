import { describe, expect, test } from '@jest/globals'
import {
  missingIngredients,
  canCraft,
  craft,
  previewStock,
  craftBatch,
  batchReport,
} from './grand-oeuvre.js'

const elixir = {
  name: 'Élixir',
  needs: { cristal: 2, soufre: 1 },
  energy: 40,
}

const philtre = {
  name: 'Philtre',
  needs: { mercure: 3, cristal: 1 },
  energy: 25,
}

describe('missingIngredients', () => {
  test('retourne un objet vide si rien ne manque', () => {
    expect(missingIngredients({ cristal: 5, soufre: 2 }, elixir)).toEqual({})
  })

  test('retourne les quantités manquantes', () => {
    expect(missingIngredients({ cristal: 1, soufre: 0 }, elixir)).toEqual({ cristal: 1, soufre: 1 })
  })

  test('considère un ingrédient absent du stock comme valant 0', () => {
    expect(missingIngredients({ cristal: 4 }, philtre)).toEqual({ mercure: 3 })
  })

  test('ne modifie pas le stock', () => {
    const stock = { cristal: 1 }
    missingIngredients(stock, elixir)
    expect(stock).toEqual({ cristal: 1 })
  })
})

describe('canCraft', () => {
  test('indique si la recette est réalisable', () => {
    expect(canCraft({ cristal: 2, soufre: 1 }, elixir)).toBe(true)
    expect(canCraft({ cristal: 2 }, elixir)).toBe(false)
  })
})

describe('craft', () => {
  test('consomme le stock et retourne le produit', () => {
    const stock = { cristal: 5, soufre: 2, mercure: 7 }

    expect(craft(stock, elixir)).toEqual({ name: 'Élixir', energy: 40 })
    expect(stock).toEqual({ cristal: 3, soufre: 1, mercure: 7 })
  })

  test('amplifie l énergie avec un facteur', () => {
    const stock = { cristal: 5, soufre: 2 }
    expect(craft(stock, elixir, 3)).toEqual({ name: 'Élixir', energy: 120 })
  })

  test('lance une erreur et ne touche pas au stock si un ingrédient manque', () => {
    const stock = { cristal: 5 }
    expect(() => craft(stock, elixir)).toThrow('Ingrédients manquants pour Élixir')
    expect(stock).toEqual({ cristal: 5 })
  })
})

describe('previewStock', () => {
  test('retourne le stock restant sans modifier l original', () => {
    const stock = { cristal: 5, soufre: 2 }
    const preview = previewStock(stock, elixir)

    expect(preview).toEqual({ cristal: 3, soufre: 1 })
    expect(preview).not.toBe(stock)
    expect(stock).toEqual({ cristal: 5, soufre: 2 })
  })

  test('retourne null si la recette est impossible', () => {
    expect(previewStock({ cristal: 1 }, elixir)).toBeNull()
  })
})

describe('craftBatch', () => {
  test('réalise la quantité demandée', () => {
    const stock = { cristal: 10, soufre: 5 }

    expect(craftBatch(stock, elixir, 3)).toEqual({ crafted: 3, totalEnergy: 120, missing: {} })
    expect(stock).toEqual({ cristal: 4, soufre: 2 })
  })

  test('s arrête quand le stock est insuffisant', () => {
    const stock = { cristal: 5, soufre: 4 }

    expect(craftBatch(stock, elixir, 10)).toEqual({
      crafted: 2,
      totalEnergy: 80,
      missing: { cristal: 1 },
    })
    expect(stock).toEqual({ cristal: 1, soufre: 2 })
  })

  test('ne réalise rien si c est impossible dès le départ', () => {
    const stock = { cristal: 4 }

    expect(craftBatch(stock, philtre, 2)).toEqual({
      crafted: 0,
      totalEnergy: 0,
      missing: { mercure: 3 },
    })
    expect(stock).toEqual({ cristal: 4 })
  })
})

describe('batchReport', () => {
  test('construit le rapport de production', () => {
    const stock = { cristal: 5, soufre: 4 }
    const batch = craftBatch(stock, elixir, 10)

    expect(batchReport(elixir, batch)).toBe('Élixir x2 : 80')
  })
})
