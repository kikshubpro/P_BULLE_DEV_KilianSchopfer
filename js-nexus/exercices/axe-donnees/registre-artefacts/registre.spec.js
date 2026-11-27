import { describe, expect, test } from '@jest/globals';
import {
  parseEntry,
  buildRegistry,
  strongestArtifacts,
  registryLabels,
  totalPower,
  groupByPowerLevel,
  findByName,
} from './registre.js';

const text = `ARC-1;Orbe;75
ARC-2;Cristal;40

  ARC-3 ; Sceptre ancien ; 90
ARC-4;Amulette;75
`;

describe('parseEntry', () => {
  test('transforme une ligne en fiche', () => {
    expect(parseEntry('ARC-1;Orbe;75')).toEqual({ id: 1, name: 'Orbe', power: 75 });
  });

  test('ignore les espaces autour des valeurs', () => {
    expect(parseEntry('  ARC-12 ; Sceptre ancien ; 90 ')).toEqual({
      id: 12,
      name: 'Sceptre ancien',
      power: 90,
    });
  });

  test('refuse un code qui ne vient pas des Archives', () => {
    expect(() => parseEntry('NEX-2;Orbe;75')).toThrow('Code invalide : NEX-2');
  });

  test('refuse une puissance qui n est pas un nombre', () => {
    expect(() => parseEntry('ARC-2;Orbe;beaucoup')).toThrow('Puissance invalide : Orbe');
  });
});

describe('buildRegistry', () => {
  test('construit un tableau de fiches en ignorant les lignes vides', () => {
    expect(buildRegistry(text)).toEqual([
      { id: 1, name: 'Orbe', power: 75 },
      { id: 2, name: 'Cristal', power: 40 },
      { id: 3, name: 'Sceptre ancien', power: 90 },
      { id: 4, name: 'Amulette', power: 75 },
    ]);
  });

  test('retourne un tableau vide pour un texte vide', () => {
    expect(buildRegistry('')).toEqual([]);
  });
});

describe('strongestArtifacts', () => {
  test('filtre et trie par puissance décroissante puis par nom', () => {
    const registry = buildRegistry(text);
    const names = strongestArtifacts(registry, 50).map((artifact) => artifact.name);
    expect(names).toEqual(['Sceptre ancien', 'Amulette', 'Orbe']);
  });

  test('utilise 0 comme puissance minimale par défaut', () => {
    expect(strongestArtifacts(buildRegistry(text))).toHaveLength(4);
  });

  test('ne modifie pas le registre', () => {
    const registry = buildRegistry(text);
    const copy = JSON.parse(JSON.stringify(registry));
    const result = strongestArtifacts(registry);

    expect(registry).toEqual(copy);
    expect(result).not.toBe(registry);
  });
});

describe('registryLabels', () => {
  test('construit les libellés', () => {
    expect(registryLabels(buildRegistry('ARC-1;Orbe;75\nARC-2;Cristal;40'))).toEqual([
      'Orbe (75)',
      'Cristal (40)',
    ]);
  });
});

describe('totalPower', () => {
  test('additionne les puissances', () => {
    expect(totalPower(buildRegistry(text))).toBe(280);
    expect(totalPower([])).toBe(0);
  });
});

describe('groupByPowerLevel', () => {
  test('regroupe les noms par niveau', () => {
    expect(groupByPowerLevel(buildRegistry(text))).toEqual({
      faible: ['Cristal'],
      moyen: ['Orbe', 'Amulette'],
      fort: ['Sceptre ancien'],
    });
  });

  test('retourne des groupes vides pour un registre vide', () => {
    expect(groupByPowerLevel([])).toEqual({ faible: [], moyen: [], fort: [] });
  });
});

describe('findByName', () => {
  test('trouve un artefact sans tenir compte de la casse', () => {
    const registry = buildRegistry(text);
    expect(findByName(registry, '  sceptre ANCIEN ')).toBe(registry[2]);
    expect(findByName(registry, 'Épée')).toBeUndefined();
  });
});
