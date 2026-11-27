import { describe, expect, test } from '@jest/globals';
import { Discovery } from '../chroniques-nexus/chroniques.js';
import {
  saveChronicle,
  restoreChronicle,
  timeline,
  mergeChronicles,
  annotate,
  latestDiscovery,
} from './restauration.js';

const chronicle = () => [
  new Discovery('Faille', new Date('2026-03-10'), 5),
  new Discovery('Orbe', new Date('2024-05-06'), 3),
  new Discovery('Sceptre', new Date('2026-02-01'), 4),
  new Discovery('Cristal', new Date('2025-07-15'), 2),
];

describe('saveChronicle', () => {
  test('produit une chaîne JSON versionnée', () => {
    const text = saveChronicle([new Discovery('Orbe', new Date('2024-05-06'), 3)]);

    expect(typeof text).toBe('string');
    expect(JSON.parse(text)).toEqual({
      version: 1,
      discoveries: [{ name: 'Orbe', date: '2024-05-06T00:00:00.000Z', importance: 3 }],
    });
  });
});

describe('restoreChronicle', () => {
  test('recrée de vraies instances de Discovery avec de vraies dates', () => {
    const restored = restoreChronicle(saveChronicle(chronicle()));

    expect(restored).toHaveLength(4);
    expect(restored[0]).toBeInstanceOf(Discovery);
    expect(restored[0].date).toBeInstanceOf(Date);
    expect(restored[0].year()).toBe(2026);
    expect(restored[0].isImportant()).toBe(true);
    expect(restored).toEqual(chronicle());
  });

  test('utilise des valeurs par défaut pour les données manquantes', () => {
    expect(restoreChronicle('{"version":1}')).toEqual([]);

    const [discovery] = restoreChronicle(
      '{"version":1,"discoveries":[{"name":"Fragment","date":"2025-09-09"}]}'
    );
    expect(discovery.importance).toBe(1);
  });

  test('refuse une version inconnue', () => {
    expect(() => restoreChronicle('{"version":2,"discoveries":[]}')).toThrow(
      'Version non supportée : 2'
    );
  });
});

describe('timeline', () => {
  test('regroupe les noms par année dans l ordre chronologique', () => {
    expect(timeline(chronicle())).toEqual({
      2024: ['Orbe'],
      2025: ['Cristal'],
      2026: ['Sceptre', 'Faille'],
    });
  });

  test('ne modifie pas l ordre du tableau reçu', () => {
    const discoveries = chronicle();
    timeline(discoveries);
    expect(discoveries.map((discovery) => discovery.name)).toEqual([
      'Faille',
      'Orbe',
      'Sceptre',
      'Cristal',
    ]);
  });

  test('retourne un objet vide sans découverte', () => {
    expect(timeline([])).toEqual({});
  });
});

describe('mergeChronicles', () => {
  test('fusionne sans doublon en gardant la plus importante, triée par date', () => {
    const first = [
      new Discovery('Orbe', new Date('2024-05-06'), 3),
      new Discovery('Faille', new Date('2026-03-10'), 5),
    ];
    const second = [
      new Discovery('Orbe', new Date('2024-06-01'), 4),
      new Discovery('Faille', new Date('2026-03-11'), 2),
      new Discovery('Cristal', new Date('2025-07-15'), 2),
    ];

    const merged = mergeChronicles(first, second);

    expect(merged.map((d) => `${d.name}:${d.importance}`)).toEqual([
      'Orbe:4',
      'Cristal:2',
      'Faille:5',
    ]);
    expect(merged[0]).toBe(second[0]);
    expect(merged[2]).toBe(first[1]);
  });

  test('garde la première en cas d importance égale', () => {
    const first = [new Discovery('Orbe', new Date('2024-05-06'), 3)];
    const second = [new Discovery('Orbe', new Date('2024-06-01'), 3)];
    expect(mergeChronicles(first, second)[0]).toBe(first[0]);
  });

  test('ne modifie pas les chroniques reçues', () => {
    const first = chronicle();
    const second = [new Discovery('Orbe', new Date('2024-06-01'), 5)];

    const merged = mergeChronicles(first, second);

    expect(first).toEqual(chronicle());
    expect(second).toHaveLength(1);
    expect(merged).not.toBe(first);
  });
});

describe('annotate', () => {
  test('ajoute une note aux découvertes citées et retourne leur nombre', () => {
    const discoveries = chronicle();
    const count = annotate(discoveries, {
      Orbe: 'Trouvé sous la bibliothèque',
      Faille: 'Instable',
      Inconnue: 'Personne ne sait',
    });

    expect(count).toBe(2);
    expect(discoveries[1].note).toBe('Trouvé sous la bibliothèque');
    expect(discoveries[0].note).toBe('Instable');
    expect(discoveries[2].note).toBeUndefined();
  });

  test('la note est conservée par la sauvegarde', () => {
    const discoveries = chronicle();
    annotate(discoveries, { Orbe: 'Fragile' });

    const saved = JSON.parse(saveChronicle(discoveries));
    expect(saved.discoveries[1].note).toBe('Fragile');
  });
});

describe('latestDiscovery', () => {
  test('retourne la découverte la plus récente et son ancienneté', () => {
    expect(latestDiscovery(chronicle(), new Date('2026-03-20'))).toEqual({
      name: 'Faille',
      daysAgo: 10,
    });
  });

  test('retourne null sans découverte', () => {
    expect(latestDiscovery([], new Date('2026-03-20'))).toBeNull();
  });
});
