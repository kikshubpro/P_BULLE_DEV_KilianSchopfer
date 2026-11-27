# La Forge

## Le grand œuvre

Lambda vous ouvre enfin son laboratoire secret. Sur les étagères : des cristaux, du soufre, du mercure. Sur la table : un grimoire de recettes.

Chaque recette consomme des ingrédients du stock et produit un objet chargé d'énergie.

> « Le grand œuvre exige deux talents : savoir **transformer** la matière, et savoir **prévoir** sans rien gaspiller. »

Cette mission réunit tout ce que vous avez appris dans La Forge : des fonctions qui **retournent des objets**, des fonctions qui **modifient des objets**, et des fonctions qui doivent **surtout ne rien modifier**.

Vous allez utiliser :

- objets dont les clés ne sont pas connues à l'avance ;
- `for...in` et l'accès `objet[cle]` ;
- fonctions qui retournent un objet ;
- fonctions qui modifient un objet ;
- copie d'un objet avec `{ ...objet }` ;
- `import` depuis plusieurs exercices ;
- réutilisation de fonctions.

# Prérequis

Cet exercice **réutilise vos fonctions** des missions :

- *Le catalyseur* : `stabilizeEnergy` dans `../catalyseur/catalyseur.js` ;
- *L'assemblage modulaire* : `formatResult` dans `../assemblage-modulaire/messages.js`.

# Les données

Un **stock** associe un nom d'ingrédient à une quantité :

```javascript
const stock = { cristal: 5, soufre: 2, mercure: 7 }
```

Une **recette** a un nom, des besoins et une énergie :

```javascript
const elixir = {
  name: 'Élixir',
  needs: { cristal: 2, soufre: 1 },
  energy: 40,
}
```

Un ingrédient absent du stock compte comme une quantité de `0`.

# Instructions

Complétez les fonctions du fichier `grand-oeuvre.js`.

## 0. Importer

Importez `stabilizeEnergy` et `formatResult` depuis leurs fichiers respectifs.

## 1. Lister ce qui manque

Implémentez :

```javascript
missingIngredients(stock, recipe)
```

La fonction retourne un **nouvel objet** qui contient, pour chaque ingrédient insuffisant, la quantité qui manque.

```javascript
missingIngredients({ cristal: 1, soufre: 0 }, elixir)
// => { cristal: 1, soufre: 1 }

missingIngredients({ cristal: 5, soufre: 2 }, elixir)
// => {}
```

Le stock ne doit pas être modifié.

## 2. Vérifier une recette

Implémentez :

```javascript
canCraft(stock, recipe)
```

La fonction retourne `true` si rien ne manque. Elle doit **réutiliser `missingIngredients`**.

## 3. Réaliser une recette

Implémentez :

```javascript
craft(stock, recipe, factor = 1)
```

La fonction :

1. lance une erreur `Ingrédients manquants pour <nom>` si la recette est impossible — **dans ce cas, le stock ne doit pas avoir changé** ;
2. **modifie** le stock en retirant les quantités nécessaires ;
3. **retourne** un nouvel objet produit `{ name, energy }`, où `energy` est calculée avec `stabilizeEnergy(recipe.energy, factor)`.

```javascript
const stock = { cristal: 5, soufre: 2, mercure: 7 }

craft(stock, elixir)
// => { name: 'Élixir', energy: 40 }
// stock vaut maintenant { cristal: 3, soufre: 1, mercure: 7 }
```

## 4. Prévoir sans gaspiller

Implémentez :

```javascript
previewStock(stock, recipe)
```

La fonction retourne **le stock tel qu'il serait** après la recette, **sans modifier le stock reçu**. Si la recette est impossible, elle retourne `null`.

Vous devez **réutiliser `craft`**… sur une copie.

```javascript
const stock = { cristal: 5, soufre: 2 }

previewStock(stock, elixir)
// => { cristal: 3, soufre: 1 }
// stock vaut toujours { cristal: 5, soufre: 2 }
```

## 5. Produire en série

Implémentez :

```javascript
craftBatch(stock, recipe, quantity)
```

La fonction réalise la recette jusqu'à `quantity` fois, **en s'arrêtant dès que le stock ne suffit plus**. Le stock est modifié.

Elle retourne un objet bilan :

| Propriété     | Contenu                                                                 |
|---------------|-------------------------------------------------------------------------|
| `crafted`     | nombre de recettes réellement réalisées                                 |
| `totalEnergy` | somme de l'énergie des produits obtenus                                 |
| `missing`     | ce qui manque **après** la production pour en réaliser une de plus      |

```javascript
const stock = { cristal: 5, soufre: 4 }

craftBatch(stock, elixir, 10)
// => { crafted: 2, totalEnergy: 80, missing: { cristal: 1 } }
// stock vaut maintenant { cristal: 1, soufre: 2 }
```

Réutilisez `canCraft`, `craft` et `missingIngredients`. Aucune erreur ne doit être lancée.

## 6. Rédiger le rapport

Implémentez :

```javascript
batchReport(recipe, batch)
```

`batch` est l'objet retourné par `craftBatch`. Réutilisez `formatResult(...)`.

```javascript
batchReport(elixir, { crafted: 2, totalEnergy: 80, missing: { cristal: 1 } })
// => "Élixir x2 : 80"
```

## 7. Comprendre

À la fin de l'exercice, soyez capable d'expliquer :

- quelles fonctions **modifient** leurs paramètres et lesquelles n'en modifient aucun ;
- pourquoi `craft` doit vérifier le stock **avant** de commencer à le modifier ;
- pourquoi `previewStock` doit faire une copie avant d'appeler `craft` ;
- pourquoi on écrit `stock[ingredient]` et pas `stock.ingredient`.

---

### À rechercher si nécessaire

- `JavaScript for...in`
- `JavaScript bracket notation object`
- `JavaScript Object.keys`
- `JavaScript spread object copy`
- `JavaScript nullish coalescing ??`

<details>
<summary>Aides</summary>

## Parcourir les clés d'un objet

```javascript
const needs = { cristal: 2, soufre: 1 }

for (const ingredient in needs) {
  console.log(ingredient, needs[ingredient])
}
// cristal 2
// soufre 1
```

## Notation crochets

Lorsque le nom de la propriété est dans une variable, on utilise les crochets :

```javascript
const key = 'cristal'
stock[key]        // lit stock.cristal
stock[key] = 3    // modifie stock.cristal
```

## Compter les clés d'un objet

```javascript
Object.keys({ a: 1, b: 2 }).length
// => 2
```

## Copier un objet

```javascript
const original = { a: 1 }
const copy = { ...original }
copy.a = 99
// original.a vaut toujours 1
```

</details>
