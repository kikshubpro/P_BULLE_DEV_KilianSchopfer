import { describe, expect, test } from '@jest/globals'
import {
  createFormula,
  splitEnergy,
  analyzeFormula,
  compareFormulas,
  fuseFormulas,
} from './creuset.js'

describe('createFormula', () => {
  test('retourne un objet décrivant la formule', () => {
    expect(createFormula('Nova', 10, 20, 5)).toEqual({
      name: 'Nova',
      ingredients: [10, 20, 5],
      energy: 35,
    })
  })

  test('accepte une formule sans ingrédient', () => {
    expect(createFormula('Vide')).toEqual({ name: 'Vide', ingredients: [], energy: 0 })
  })

  test('crée un nouvel objet à chaque appel', () => {
    const first = createFormula('Nova', 10)
    const second = createFormula('Nova', 10)
    expect(first).toEqual(second)
    expect(first).not.toBe(second)
  })
})

describe('splitEnergy', () => {
  test('retourne la part et le reste', () => {
    expect(splitEnergy(100, 3)).toEqual({ share: 33, remainder: 1 })
    expect(splitEnergy(40, 4)).toEqual({ share: 10, remainder: 0 })
  })
})

describe('analyzeFormula', () => {
  test('retourne les statistiques de la formule', () => {
    const formula = createFormula('Nova', 10, 30, 5, 15)
    expect(analyzeFormula(formula)).toEqual({
      name: 'Nova',
      count: 4,
      min: 5,
      max: 30,
      average: 15,
    })
  })

  test('gère une formule sans ingrédient', () => {
    expect(analyzeFormula(createFormula('Vide'))).toEqual({
      name: 'Vide',
      count: 0,
      min: null,
      max: null,
      average: null,
    })
  })

  test('ne modifie pas la formule analysée', () => {
    const formula = createFormula('Nova', 10, 30)
    analyzeFormula(formula)
    expect(formula).toEqual({ name: 'Nova', ingredients: [10, 30], energy: 40 })
  })
})

describe('compareFormulas', () => {
  test('désigne la formule la plus puissante et l écart', () => {
    const nova = createFormula('Nova', 10, 20)
    const pulse = createFormula('Pulse', 50)
    expect(compareFormulas(nova, pulse)).toEqual({ strongest: 'Pulse', gap: 20 })
    expect(compareFormulas(pulse, nova)).toEqual({ strongest: 'Pulse', gap: 20 })
  })

  test('retourne null en cas d égalité', () => {
    const nova = createFormula('Nova', 10, 20)
    const echo = createFormula('Echo', 30)
    expect(compareFormulas(nova, echo)).toEqual({ strongest: null, gap: 0 })
  })
})

describe('fuseFormulas', () => {
  test('crée une nouvelle formule avec tous les ingrédients', () => {
    const nova = createFormula('Nova', 10, 20)
    const pulse = createFormula('Pulse', 5)
    expect(fuseFormulas('Supernova', nova, pulse)).toEqual({
      name: 'Supernova',
      ingredients: [10, 20, 5],
      energy: 35,
    })
  })

  test('ne modifie pas les formules d origine', () => {
    const nova = createFormula('Nova', 10, 20)
    const pulse = createFormula('Pulse', 5)
    const fused = fuseFormulas('Supernova', nova, pulse)
    expect(nova).toEqual({ name: 'Nova', ingredients: [10, 20], energy: 30 })
    expect(pulse).toEqual({ name: 'Pulse', ingredients: [5], energy: 5 })
    expect(fused.ingredients).not.toBe(nova.ingredients)
  })
})
