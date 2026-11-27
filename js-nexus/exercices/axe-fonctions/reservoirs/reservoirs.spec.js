import { describe, expect, test } from '@jest/globals'
import {
  createReservoir,
  fillReservoir,
  drainReservoir,
  applyLeak,
  transferEnergy,
  resetReservoir,
} from './reservoirs.js'

describe('createReservoir', () => {
  test('retourne un réservoir vide', () => {
    expect(createReservoir('Alpha', 100)).toEqual({
      name: 'Alpha',
      capacity: 100,
      level: 0,
      history: [],
    })
  })

  test('chaque réservoir a son propre historique', () => {
    const alpha = createReservoir('Alpha', 100)
    const beta = createReservoir('Beta', 100)
    expect(alpha.history).not.toBe(beta.history)
  })
})

describe('fillReservoir', () => {
  test('modifie le réservoir et retourne la quantité ajoutée', () => {
    const alpha = createReservoir('Alpha', 100)
    expect(fillReservoir(alpha, 70)).toBe(70)
    expect(alpha.level).toBe(70)
    expect(alpha.history).toEqual([70])
  })

  test('ne dépasse pas la capacité', () => {
    const alpha = createReservoir('Alpha', 100)
    fillReservoir(alpha, 70)
    expect(fillReservoir(alpha, 50)).toBe(30)
    expect(alpha.level).toBe(100)
    expect(fillReservoir(alpha, 10)).toBe(0)
    expect(alpha.history).toEqual([70, 30])
  })

  test('refuse une quantité nulle ou négative', () => {
    const alpha = createReservoir('Alpha', 100)
    expect(() => fillReservoir(alpha, 0)).toThrow('Quantité invalide')
    expect(() => fillReservoir(alpha, -5)).toThrow('Quantité invalide')
    expect(alpha.level).toBe(0)
  })

  test('la modification est visible depuis toutes les variables', () => {
    const alpha = createReservoir('Alpha', 100)
    const sameReservoir = alpha
    fillReservoir(sameReservoir, 40)
    expect(alpha.level).toBe(40)
  })
})

describe('drainReservoir', () => {
  test('modifie le réservoir et retourne la quantité retirée', () => {
    const alpha = createReservoir('Alpha', 100)
    fillReservoir(alpha, 60)
    expect(drainReservoir(alpha, 25)).toBe(25)
    expect(alpha.level).toBe(35)
    expect(alpha.history).toEqual([60, -25])
  })

  test('ne descend pas sous zéro', () => {
    const alpha = createReservoir('Alpha', 100)
    fillReservoir(alpha, 20)
    expect(drainReservoir(alpha, 50)).toBe(20)
    expect(alpha.level).toBe(0)
    expect(drainReservoir(alpha, 10)).toBe(0)
    expect(alpha.history).toEqual([20, -20])
  })

  test('refuse une quantité nulle ou négative', () => {
    const alpha = createReservoir('Alpha', 100)
    expect(() => drainReservoir(alpha, 0)).toThrow('Quantité invalide')
  })
})

describe('applyLeak', () => {
  test('modifie tous les réservoirs sans rien retourner', () => {
    const alpha = createReservoir('Alpha', 100)
    const beta = createReservoir('Beta', 100)
    const gamma = createReservoir('Gamma', 100)
    fillReservoir(alpha, 50)
    fillReservoir(beta, 5)

    expect(applyLeak([alpha, beta, gamma], 10)).toBeUndefined()

    expect(alpha.level).toBe(40)
    expect(alpha.history).toEqual([50, -10])
    expect(beta.level).toBe(0)
    expect(beta.history).toEqual([5, -5])
    expect(gamma.level).toBe(0)
    expect(gamma.history).toEqual([])
  })
})

describe('transferEnergy', () => {
  test('déplace l énergie entre deux réservoirs', () => {
    const alpha = createReservoir('Alpha', 100)
    const beta = createReservoir('Beta', 100)
    fillReservoir(alpha, 80)

    expect(transferEnergy(alpha, beta, 30)).toBe(30)
    expect(alpha.level).toBe(50)
    expect(beta.level).toBe(30)
    expect(alpha.history).toEqual([80, -30])
    expect(beta.history).toEqual([30])
  })

  test('est limité par la source et par la cible', () => {
    const alpha = createReservoir('Alpha', 100)
    const small = createReservoir('Small', 25)
    fillReservoir(alpha, 20)
    fillReservoir(small, 10)

    expect(transferEnergy(alpha, small, 50)).toBe(15)
    expect(alpha.level).toBe(5)
    expect(small.level).toBe(25)
  })

  test('retourne 0 sans rien modifier si le transfert est impossible', () => {
    const empty = createReservoir('Empty', 100)
    const full = createReservoir('Full', 10)
    fillReservoir(full, 10)

    expect(transferEnergy(empty, full, 5)).toBe(0)
    expect(transferEnergy(full, full, 5)).toBe(0)
    expect(empty).toEqual({ name: 'Empty', capacity: 100, level: 0, history: [] })
    expect(full.level).toBe(10)
    expect(full.history).toEqual([10])
  })
})

describe('resetReservoir', () => {
  test('modifie et retourne le même objet', () => {
    const alpha = createReservoir('Alpha', 100)
    fillReservoir(alpha, 60)

    const result = resetReservoir(alpha)

    expect(result).toBe(alpha)
    expect(alpha.level).toBe(0)
    expect(alpha.history).toEqual([])
  })
})
