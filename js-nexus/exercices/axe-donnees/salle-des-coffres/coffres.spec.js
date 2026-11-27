import { describe, expect, test } from '@jest/globals';
import {
  Vault,
  storeArtifact,
  retrieveArtifact,
  upgradeVault,
  moveArtifact,
  distributeArtifacts,
} from './coffres.js';

const orbe = () => ({ id: 1, name: 'Orbe', power: 75 });
const cristal = () => ({ id: 2, name: 'Cristal', power: 40 });
const sceptre = () => ({ id: 3, name: 'Sceptre', power: 90 });

/**
 * Crée un coffre déjà rempli, sans passer par storeArtifact.
 */
function vaultWith(name, capacity, ...artifacts) {
  const vault = new Vault(name, capacity);
  vault.artifacts.push(...artifacts);
  return vault;
}

describe('Vault', () => {
  test('crée un coffre vide', () => {
    const vault = new Vault('Alpha', 3);
    expect(vault.name).toBe('Alpha');
    expect(vault.capacity).toBe(3);
    expect(vault.artifacts).toEqual([]);
  });

  test('chaque coffre a son propre tableau', () => {
    expect(new Vault('A', 1).artifacts).not.toBe(new Vault('B', 1).artifacts);
  });
});

describe('getters', () => {
  test('count et totalPower décrivent le contenu', () => {
    expect(new Vault('Vide', 3).count).toBe(0);
    expect(new Vault('Vide', 3).totalPower).toBe(0);

    const vault = vaultWith('Alpha', 3, orbe(), cristal());
    expect(vault.count).toBe(2);
    expect(vault.totalPower).toBe(115);
  });

  test('isFull dépend de la capacité', () => {
    expect(vaultWith('Alpha', 3, orbe(), cristal()).isFull).toBe(false);
    expect(vaultWith('Alpha', 2, orbe(), cristal()).isFull).toBe(true);
  });

  test('les getters suivent les changements du coffre', () => {
    const vault = vaultWith('Alpha', 2, orbe());
    vault.artifacts.push(cristal());
    expect(vault.count).toBe(2);
    expect(vault.isFull).toBe(true);
  });

  test('summary retourne un résumé du coffre', () => {
    const vault = vaultWith('Alpha', 3, orbe(), sceptre());
    expect(vault.summary).toEqual({ name: 'Alpha', count: 2, totalPower: 165, ids: [1, 3] });
  });

  test('un résumé ne change pas quand le coffre change', () => {
    const vault = vaultWith('Alpha', 3, orbe());
    const summary = vault.summary;

    vault.artifacts.push(cristal());

    expect(summary).toEqual({ name: 'Alpha', count: 1, totalPower: 75, ids: [1] });
    expect(vault.summary).not.toBe(summary);
  });
});

describe('storeArtifact', () => {
  test('modifie le coffre reçu', () => {
    const vault = new Vault('Alpha', 3);
    const artifact = orbe();

    expect(storeArtifact(vault, artifact)).toBeUndefined();
    expect(vault.artifacts).toHaveLength(1);
    expect(vault.artifacts[0]).toBe(artifact);
  });

  test('refuse un coffre plein', () => {
    const vault = vaultWith('Alpha', 1, orbe());
    expect(() => storeArtifact(vault, cristal())).toThrow('Coffre Alpha plein');
    expect(vault.count).toBe(1);
  });

  test('refuse un identifiant déjà présent', () => {
    const vault = vaultWith('Alpha', 3, orbe());
    expect(() => storeArtifact(vault, { id: 1, name: 'Copie', power: 10 })).toThrow(
      'Artefact 1 déjà présent'
    );
    expect(vault.count).toBe(1);
  });
});

describe('retrieveArtifact', () => {
  test('retire et retourne l artefact demandé', () => {
    const vault = vaultWith('Alpha', 3, orbe(), cristal(), sceptre());

    expect(retrieveArtifact(vault, 2)).toEqual(cristal());
    expect(vault.summary.ids).toEqual([1, 3]);
  });

  test('retourne undefined si l artefact est absent', () => {
    const vault = vaultWith('Alpha', 3, orbe());
    expect(retrieveArtifact(vault, 42)).toBeUndefined();
    expect(vault.count).toBe(1);
  });
});

describe('upgradeVault', () => {
  test('améliore tous les artefacts du coffre', () => {
    const vault = vaultWith('Alpha', 3, orbe(), cristal());

    upgradeVault(vault, 10);

    expect(vault.artifacts).toEqual([
      { id: 1, name: 'Orbe', power: 85 },
      { id: 2, name: 'Cristal', power: 50 },
    ]);
    expect(vault.totalPower).toBe(135);
  });

  test('ne modifie pas les objets artefacts d origine', () => {
    const artifact = orbe();
    const vault = vaultWith('Alpha', 3, artifact);

    upgradeVault(vault, 10);

    expect(artifact.power).toBe(75);
    expect(vault.artifacts[0]).not.toBe(artifact);
  });
});

describe('moveArtifact', () => {
  test('déplace un artefact', () => {
    const alpha = vaultWith('Alpha', 3, orbe(), cristal());
    const beta = new Vault('Beta', 3);

    expect(moveArtifact(alpha, beta, 1)).toBe(true);
    expect(alpha.summary.ids).toEqual([2]);
    expect(beta.summary.ids).toEqual([1]);
  });

  test('retourne false si l artefact est absent', () => {
    expect(moveArtifact(new Vault('Alpha', 3), new Vault('Beta', 3), 1)).toBe(false);
  });

  test('laisse l artefact dans le coffre de départ si le déplacement échoue', () => {
    const alpha = vaultWith('Alpha', 3, orbe());
    const full = vaultWith('Full', 1, cristal());
    const twin = vaultWith('Twin', 3, { id: 1, name: 'Jumeau', power: 5 });

    expect(moveArtifact(alpha, full, 1)).toBe(false);
    expect(moveArtifact(alpha, twin, 1)).toBe(false);
    expect(alpha.artifacts).toEqual([orbe()]);
    expect(full.summary.ids).toEqual([2]);
    expect(twin.count).toBe(1);
  });
});

describe('distributeArtifacts', () => {
  test('remplit les coffres dans l ordre et retourne les restes', () => {
    const alpha = new Vault('Alpha', 1);
    const beta = new Vault('Beta', 1);
    const extra = { id: 4, name: 'Amulette', power: 60 };

    const leftovers = distributeArtifacts([orbe(), cristal(), sceptre(), extra], [alpha, beta]);

    expect(alpha.summary.ids).toEqual([1]);
    expect(beta.summary.ids).toEqual([2]);
    expect(leftovers).toEqual([sceptre(), extra]);
  });

  test('retourne un tableau vide si tout est rangé', () => {
    const alpha = new Vault('Alpha', 5);
    expect(distributeArtifacts([orbe(), cristal()], [alpha])).toEqual([]);
    expect(alpha.count).toBe(2);
  });
});
