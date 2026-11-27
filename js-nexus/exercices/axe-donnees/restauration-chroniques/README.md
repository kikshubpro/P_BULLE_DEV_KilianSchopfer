# Les Archives

## La restauration des chroniques

Une tempête de données a traversé les Archives. Les chroniques du Nexus ont survécu… sous forme de texte JSON.

Lin doit les restaurer, les fusionner avec une copie retrouvée ailleurs, et les annoter.

> « JSON garde la forme des données, pas leur nature. Une date devient du texte, une découverte devient un simple objet. À toi de leur rendre vie. »

Cette mission montre ce que JSON **perd** lors d'une sauvegarde, et comment reconstruire de vraies instances.

Vous allez utiliser :

- `JSON.stringify` et `JSON.parse` ;
- `Date` ;
- classes et instances ;
- déstructuration avec valeurs par défaut ;
- objets à clés dynamiques ;
- fonctions qui retournent un objet, fonctions qui modifient des objets ;
- `import` depuis un autre exercice.

# Prérequis

Cet exercice **réutilise** la classe `Discovery` et la fonction `daysBetween` de la mission *Archiver les chroniques du Nexus* (`../chroniques-nexus/chroniques.js`).

# Instructions

Complétez le fichier `restauration.js`.

## 0. Importer

Importez `Discovery` et `daysBetween` depuis `../chroniques-nexus/chroniques.js`.

## 1. Sauvegarder

Implémentez :

```javascript
saveChronicle(discoveries)
```

La fonction retourne une chaîne JSON représentant l'objet :

```javascript
{ version: 1, discoveries: [...] }
```

Observez ce que devient la date d'une découverte dans la chaîne produite.

## 2. Restaurer

Implémentez :

```javascript
restoreChronicle(text)
```

La fonction :

1. lit le JSON reçu ;
2. lance l'erreur `Version non supportée : <version>` si `version` ne vaut pas `1` ;
3. retourne un tableau de **vraies instances** de `Discovery`, avec de **vraies** `Date`.

Les données peuvent être incomplètes :

- si `discoveries` est absent, on considère un tableau vide ;
- si une découverte n'a pas d'`importance`, elle vaut `1`.

Utilisez la **déstructuration avec valeurs par défaut**.

```javascript
const [orbe] = restoreChronicle(saveChronicle([new Discovery('Orbe', new Date('2024-05-06'), 3)]));

orbe instanceof Discovery  // => true
orbe.year()                // => 2024
```

## 3. Frise chronologique

Implémentez :

```javascript
timeline(discoveries)
```

La fonction retourne un objet dont les **clés sont les années** et les valeurs les noms des découvertes de cette année, **dans l'ordre chronologique**.

```javascript
timeline(discoveries)
// => { 2024: ['Orbe'], 2025: ['Cristal'], 2026: ['Sceptre', 'Faille'] }
```

Réutilisez la méthode `year()`. Le tableau reçu ne doit pas changer d'ordre.

## 4. Fusionner deux chroniques

Implémentez :

```javascript
mergeChronicles(first, second)
```

La fonction retourne un **nouveau tableau** contenant les découvertes des deux chroniques :

- deux découvertes avec le même `name` sont des doublons : on garde celle qui a la plus grande `importance` (la première rencontrée en cas d'égalité) ;
- le résultat est trié par date croissante ;
- les tableaux reçus ne doivent pas être modifiés.

```javascript
// first  : Orbe (3), Faille (5)
// second : Orbe (4), Faille (2), Cristal (2)
mergeChronicles(first, second)
// => [Orbe (4), Cristal (2), Faille (5)]
```

## 5. Annoter

Implémentez :

```javascript
annotate(discoveries, notes)
```

`notes` est un objet dont les clés sont des noms de découvertes :

```javascript
{ Orbe: 'Trouvé sous la bibliothèque', Faille: 'Instable' }
```

La fonction **modifie** chaque découverte citée en lui ajoutant une propriété `note`, puis **retourne** le nombre de découvertes annotées. Les noms qui ne correspondent à aucune découverte sont ignorés.

## 6. La plus récente

Implémentez :

```javascript
latestDiscovery(discoveries, today)
```

La fonction retourne un objet décrivant la découverte la plus récente :

```javascript
latestDiscovery(discoveries, new Date('2026-03-20'))
// => { name: 'Faille', daysAgo: 10 }
```

Réutilisez `daysBetween`. S'il n'y a aucune découverte, la fonction retourne `null`.

## 7. Comprendre

À la fin de l'exercice, soyez capable d'expliquer :

- pourquoi `JSON.parse` ne redonne pas d'instance de `Discovery` ;
- pourquoi `restoreChronicle` doit appeler `new Date(...)` ;
- pourquoi `timeline` doit trier une **copie** du tableau ;
- quelles fonctions de cette mission modifient leurs paramètres.

---

### À rechercher si nécessaire

- `JavaScript JSON.stringify Date`
- `JavaScript destructuring default values`
- `JavaScript instanceof`
- `JavaScript object dynamic key`
- `JavaScript in operator`
- `JavaScript compare dates`

<details>
<summary>Aides</summary>

## Déstructuration avec valeur par défaut

```javascript
const { color = 'gris', size } = { size: 3 };
// color vaut 'gris'
```

Cela fonctionne aussi dans les paramètres d'une fonction fléchée :

```javascript
items.map(({ label, count = 0 }) => `${label} : ${count}`);
```

## Copier un tableau avant de le trier

```javascript
const sorted = [...values].sort(...);
```

## Clé dynamique

```javascript
const groups = {};
const key = 2026;
groups[key] = groups[key] ?? [];
groups[key].push('Faille');
// groups vaut { 2026: ['Faille'] }
```

## Tester la présence d'une clé

```javascript
'Orbe' in { Orbe: 'texte' }
// => true
```

## Comparer des dates

Deux `Date` se comparent avec `<` et `>`. `date.getTime()` donne un nombre de millisecondes.

</details>
