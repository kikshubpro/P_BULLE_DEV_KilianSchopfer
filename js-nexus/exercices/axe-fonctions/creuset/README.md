# La Forge

## Le creuset

Jusqu'ici, les formules de Lambda ne produisaient qu'une seule valeur : un nombre ou un message.

Mais une vraie formule alchimique a un nom, une liste d'ingrédients et une énergie totale. Lambda veut que ses fonctions retournent **toutes ces informations d'un coup**.

> « Une formule qui ne rend qu'un chiffre oublie d'où elle vient. Fais-lui rendre un objet complet. »

Cette mission est centrée sur les **fonctions qui retournent un objet**.

Vous allez utiliser :

- objets littéraux `{ ... }` ;
- fonctions qui retournent un objet ;
- paramètres rest `...` et transmission avec `...` ;
- `import` depuis un autre exercice ;
- réutilisation de fonctions.

# Prérequis

Cet exercice **réutilise vos fonctions** de la mission *Les fragments d'énergie*.

Votre fichier `../fragments-energie/fragments.js` doit donc être terminé et ses tests doivent passer.

# Instructions

Complétez les fonctions du fichier `creuset.js`.

## 0. Importer

En haut de `creuset.js`, importez `sumFragments` et `averageFragments` depuis :

```text
../fragments-energie/fragments.js
```

## 1. Créer une formule

Implémentez :

```javascript
createFormula(name, ...ingredients)
```

La fonction retourne un **objet** avec trois propriétés :

| Propriété     | Contenu                                         |
|---------------|-------------------------------------------------|
| `name`        | le nom reçu                                     |
| `ingredients` | le tableau des ingrédients reçus                |
| `energy`      | la somme des ingrédients, avec `sumFragments`   |

```javascript
createFormula('Nova', 10, 20, 5)
// => { name: 'Nova', ingredients: [10, 20, 5], energy: 35 }

createFormula('Vide')
// => { name: 'Vide', ingredients: [], energy: 0 }
```

Chaque appel doit créer un **nouvel** objet.

## 2. Répartir une énergie

Implémentez :

```javascript
splitEnergy(energy, parts)
```

La fonction retourne un objet contenant :

- `share` : la part entière que reçoit chaque morceau ;
- `remainder` : l'énergie qui reste après la répartition.

```javascript
splitEnergy(100, 3)
// => { share: 33, remainder: 1 }
```

## 3. Analyser une formule

Implémentez :

```javascript
analyzeFormula(formula)
```

La fonction reçoit un objet créé par `createFormula` et retourne un **nouvel** objet :

```javascript
analyzeFormula(createFormula('Nova', 10, 30, 5, 15))
// => { name: 'Nova', count: 4, min: 5, max: 30, average: 15 }
```

- `min` et `max` doivent être calculés avec une boucle `for...of` ;
- `average` doit être calculé avec `averageFragments(...)`.

Si la formule ne contient aucun ingrédient, `min`, `max` et `average` valent `null` :

```javascript
analyzeFormula(createFormula('Vide'))
// => { name: 'Vide', count: 0, min: null, max: null, average: null }
```

La formule reçue ne doit pas être modifiée.

## 4. Comparer deux formules

Implémentez :

```javascript
compareFormulas(first, second)
```

La fonction retourne :

- `strongest` : le **nom** de la formule qui a le plus d'énergie, ou `null` en cas d'égalité ;
- `gap` : l'écart d'énergie entre les deux formules (toujours positif ou nul).

```javascript
const nova = createFormula('Nova', 10, 20)
const pulse = createFormula('Pulse', 50)

compareFormulas(nova, pulse)
// => { strongest: 'Pulse', gap: 20 }
```

## 5. Fusionner deux formules

Implémentez :

```javascript
fuseFormulas(name, first, second)
```

La fonction retourne une nouvelle formule qui contient les ingrédients de `first` puis ceux de `second`.

Vous devez **réutiliser `createFormula`**.

```javascript
fuseFormulas('Supernova', nova, createFormula('Pulse', 5))
// => { name: 'Supernova', ingredients: [10, 20, 5], energy: 35 }
```

Les formules `first` et `second` ne doivent pas être modifiées.

## 6. Comprendre

À la fin de l'exercice, soyez capable d'expliquer :

- pourquoi `createFormula` retourne un nouvel objet à chaque appel ;
- la différence entre `toEqual` et `toBe` dans les tests ;
- pourquoi `fuseFormulas` ne touche pas aux formules reçues.

---

### À rechercher si nécessaire

- `JavaScript object literal`
- `JavaScript return object from function`
- `JavaScript shorthand property names`
- `JavaScript Math.floor`
- `JavaScript Math.abs`
- `JavaScript spread array in function call`

<details>
<summary>Aides</summary>

## Retourner un objet

```javascript
function createPoint(x, y) {
  return {
    x: x,
    y: y,
  }
}
```

Lorsque le nom de la propriété est identique au nom de la variable, on peut écrire plus court :

```javascript
return { x, y }
```

## Lire une propriété

```javascript
const point = createPoint(3, 4)
point.x
// => 3
```

## Transmettre plusieurs tableaux

L'opérateur `...` peut être utilisé plusieurs fois dans un même appel :

```javascript
otherFunction(...firstArray, ...secondArray)
```

## Division entière et reste

`Math.floor(...)` arrondit vers le bas. L'opérateur `%` donne le reste d'une division.

</details>
