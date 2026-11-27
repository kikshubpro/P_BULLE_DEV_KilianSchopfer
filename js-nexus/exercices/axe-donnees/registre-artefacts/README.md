# Les Archives

## Le registre des artefacts

Lin a retrouvé un vieux registre papier. Chaque ligne décrit un artefact, mais tout est mélangé : espaces en trop, lignes vides, codes douteux.

> « Une archive illisible n'est qu'un tas de papier. Transforme ce texte en données, puis fais parler ces données. »

Cette mission vous fait passer d'un **texte brut** à un **tableau d'objets**, puis exploite ce tableau avec les méthodes de tableau les plus utilisées.

Vous allez utiliser :

- `split`, `trim`, `slice` ;
- déstructuration de tableau ;
- `filter`, `map`, `reduce`, `sort`, `find` ;
- fonctions qui retournent des objets ;
- `throw` ;
- `import` depuis d'autres exercices.

# Prérequis

Cet exercice **réutilise vos fonctions** des missions :

- *Inventorier les artefacts* : `isArchiveCode` et `normalizeArtifactName` dans `../inventaire-archives/inventaire.js` ;
- *Classer les fiches d'artefacts* : `createArtifact` et `artifactLabel` dans `../fiches-artefacts/artefacts.js`.

# Le registre

Chaque ligne a le format :

```text
ARC-<id>;<nom>;<puissance>
```

Exemple de texte :

```text
ARC-1;Orbe;75
ARC-2;Cristal;40

  ARC-3 ; Sceptre ancien ; 90
ARC-4;Amulette;75
```

# Instructions

Complétez les fonctions du fichier `registre.js`.

## 0. Importer

Importez les quatre fonctions citées dans les prérequis.

## 1. Lire une ligne

Implémentez :

```javascript
parseEntry(line)
```

La fonction :

1. découpe la ligne sur `;` et retire les espaces autour de chaque morceau ;
2. lance l'erreur `Code invalide : <code>` si le code n'est pas un code des Archives (`isArchiveCode`) ;
3. lance l'erreur `Puissance invalide : <nom>` si la puissance n'est pas un nombre ;
4. retourne la fiche créée avec `createArtifact`, où `id` est le nombre situé après `ARC-`.

```javascript
parseEntry('  ARC-12 ; Sceptre ancien ; 90 ')
// => { id: 12, name: 'Sceptre ancien', power: 90 }
```

## 2. Construire le registre

Implémentez :

```javascript
buildRegistry(text)
```

La fonction découpe le texte en lignes, **ignore les lignes vides** (ou ne contenant que des espaces) et retourne un tableau de fiches. Réutilisez `parseEntry`.

## 3. Les plus puissants

Implémentez :

```javascript
strongestArtifacts(registry, minPower = 0)
```

La fonction retourne un **nouveau tableau** :

- qui ne contient que les artefacts dont la puissance est supérieure ou égale à `minPower` ;
- trié par puissance **décroissante** ;
- en cas d'égalité de puissance, trié par nom dans l'ordre alphabétique.

```javascript
strongestArtifacts(registry, 50).map((a) => a.name)
// => ['Sceptre ancien', 'Amulette', 'Orbe']
```

Le registre reçu ne doit **pas** être modifié — attention, `sort` modifie le tableau sur lequel on l'appelle !

## 4. Les libellés

Implémentez :

```javascript
registryLabels(registry)
```

Retournez le tableau des libellés, en réutilisant `artifactLabel` avec `map`.

```javascript
// => ['Orbe (75)', 'Cristal (40)', ...]
```

## 5. La puissance totale

Implémentez :

```javascript
totalPower(registry)
```

Utilisez `reduce`. Un registre vide a une puissance totale de `0`.

## 6. Regrouper par niveau

Implémentez :

```javascript
groupByPowerLevel(registry)
```

La fonction retourne un objet contenant trois tableaux de **noms** :

| Clé      | Puissance        |
|----------|------------------|
| `faible` | moins de 50      |
| `moyen`  | de 50 à 79       |
| `fort`   | 80 et plus       |

```javascript
groupByPowerLevel(registry)
// => { faible: ['Cristal'], moyen: ['Orbe', 'Amulette'], fort: ['Sceptre ancien'] }
```

Les trois clés sont toujours présentes, même si un groupe est vide.

## 7. Rechercher par nom

Implémentez :

```javascript
findByName(registry, name)
```

La recherche ne tient compte ni des majuscules, ni des espaces autour du nom. Réutilisez `normalizeArtifactName`.

```javascript
findByName(registry, '  sceptre ANCIEN ')
// => { id: 3, name: 'Sceptre ancien', power: 90 }
```

La fonction retourne l'objet **du registre** (pas une copie), ou `undefined`.

---

### À rechercher si nécessaire

- `JavaScript string split`
- `JavaScript array destructuring`
- `JavaScript array filter map reduce`
- `JavaScript array sort compare function`
- `JavaScript localeCompare`
- `JavaScript Number.isNaN`

<details>
<summary>Aides</summary>

## Déstructurer un tableau

```javascript
const [first, second] = ['a', 'b'];
```

## Enchaîner les méthodes

```javascript
const result = values
  .filter((value) => value > 10)
  .map((value) => value * 2);
```

## Trier avec une fonction de comparaison

```javascript
values.sort((a, b) => a - b); // croissant
values.sort((a, b) => b - a); // décroissant
'Orbe'.localeCompare('Amulette'); // nombre positif : 'Orbe' vient après
```

`sort` **modifie** le tableau. `filter` et `map`, eux, retournent un nouveau tableau.

## reduce

```javascript
[1, 2, 3].reduce((total, value) => total + value, 0);
// => 6
```

</details>
