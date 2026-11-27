# La Forge

## Les réservoirs

Les formules du creuset produisent de l'énergie… qu'il faut maintenant stocker.

Lambda vous confie les réservoirs de La Forge. Chaque réservoir a un nom, une capacité, un niveau actuel et un historique de tous les mouvements.

> « Jusqu'ici, tes formules fabriquaient du neuf. Celles-ci vont **transformer ce qui existe déjà**. Fais attention : ce que tu modifies dans la formule est modifié partout. »

Cette mission est centrée sur les **fonctions qui modifient un objet** reçu en paramètre.

Vous allez utiliser :

- objets passés en paramètre ;
- modification de propriétés ;
- valeur de retour différente de la modification ;
- `throw` ;
- `import` depuis un autre exercice ;
- réutilisation de fonctions.

# Prérequis

Cet exercice **réutilise une fonction** de la mission *Le catalyseur*.

Votre fichier `../catalyseur/catalyseur.js` doit donc être terminé et ses tests doivent passer.

# Instructions

Complétez les fonctions du fichier `reservoirs.js`.

## 0. Importer

En haut de `reservoirs.js`, importez `calculateOutput` depuis :

```text
../catalyseur/catalyseur.js
```

## 1. Créer un réservoir

Implémentez :

```javascript
createReservoir(name, capacity)
```

```javascript
createReservoir('Alpha', 100)
// => { name: 'Alpha', capacity: 100, level: 0, history: [] }
```

Chaque réservoir doit avoir **son propre** tableau `history`.

## 2. Remplir un réservoir

Implémentez :

```javascript
fillReservoir(reservoir, amount)
```

La fonction **modifie** le réservoir reçu :

1. si `amount` est inférieur ou égal à `0`, elle lance une erreur `'Quantité invalide'` ;
2. elle ajoute `amount` au niveau, **sans dépasser** la capacité ;
3. si une quantité a réellement été ajoutée, elle l'ajoute à la fin de `history`.

La fonction **retourne** la quantité réellement ajoutée.

```javascript
const alpha = createReservoir('Alpha', 100)

fillReservoir(alpha, 70)
// => 70        alpha.level vaut 70, alpha.history vaut [70]

fillReservoir(alpha, 50)
// => 30        alpha.level vaut 100, alpha.history vaut [70, 30]

fillReservoir(alpha, 10)
// => 0         rien ne change
```

## 3. Vider un réservoir

Implémentez :

```javascript
drainReservoir(reservoir, amount)
```

Même principe que `fillReservoir`, mais dans l'autre sens :

- le niveau ne peut pas descendre sous `0` ;
- la quantité retirée est enregistrée dans `history` comme un nombre **négatif** ;
- la fonction retourne la quantité réellement retirée ;
- une quantité inférieure ou égale à `0` lance l'erreur `'Quantité invalide'`.

```javascript
// alpha.level vaut 60, alpha.history vaut [60]
drainReservoir(alpha, 25)
// => 25        alpha.level vaut 35, alpha.history vaut [60, -25]
```

## 4. Appliquer une fuite

Implémentez :

```javascript
applyLeak(reservoirs, loss)
```

La fonction reçoit un **tableau** de réservoirs et retire `loss` à chacun d'eux.

- calculez le nouveau niveau avec `calculateOutput(...)` ;
- le niveau ne peut pas descendre sous `0` ;
- la perte réelle est enregistrée dans `history` (nombre négatif), seulement si elle est supérieure à `0`.

La fonction **ne retourne rien** : son seul effet est de modifier les réservoirs.

```javascript
// alpha.level vaut 50, beta.level vaut 5, gamma.level vaut 0
applyLeak([alpha, beta, gamma], 10)
// => undefined
// alpha.level vaut 40, beta.level vaut 0, gamma.level vaut 0
```

## 5. Transférer de l'énergie

Implémentez :

```javascript
transferEnergy(source, target, amount)
```

La fonction déplace de l'énergie de `source` vers `target`. Elle doit **réutiliser `fillReservoir` et `drainReservoir`**.

La quantité transférée est limitée :

- par ce que contient `source` ;
- par la place disponible dans `target`.

La fonction retourne la quantité réellement transférée.

```javascript
// alpha.level vaut 20, small a une capacité de 25 et un niveau de 10
transferEnergy(alpha, small, 50)
// => 15        alpha.level vaut 5, small.level vaut 25
```

Si rien ne peut être transféré, la fonction retourne `0` **sans lancer d'erreur** et sans modifier les réservoirs.

## 6. Réinitialiser un réservoir

Implémentez :

```javascript
resetReservoir(reservoir)
```

La fonction remet `level` à `0`, vide `history`, puis retourne **le réservoir reçu** (pas une copie).

```javascript
const result = resetReservoir(alpha)
result === alpha
// => true
```

## 7. Comprendre

À la fin de l'exercice, soyez capable d'expliquer :

- pourquoi une modification faite dans `fillReservoir` est visible à l'extérieur de la fonction ;
- pourquoi `fillReservoir` retourne une valeur alors que son travail principal est de modifier l'objet ;
- la différence entre `createReservoir`, qui **crée** un objet, et `resetReservoir`, qui **modifie** un objet existant ;
- ce qui se passerait si `resetReservoir` faisait `reservoir = createReservoir(...)`.

---

### À rechercher si nécessaire

- `JavaScript objects passed by reference`
- `JavaScript modify object in function`
- `JavaScript Math.min Math.max`
- `JavaScript array push`
- `JavaScript throw new Error`

<details>
<summary>Aides</summary>

## Modifier une propriété

```javascript
const box = { count: 1 }
box.count += 2
// box.count vaut maintenant 3
```

## Objet reçu en paramètre

Une fonction qui reçoit un objet ne reçoit pas une copie : elle reçoit **une référence vers le même objet**.

```javascript
function increment(box) {
  box.count += 1
}

const myBox = { count: 1 }
increment(myBox)
// myBox.count vaut 2
```

## Limiter une valeur

```javascript
Math.min(8, 5)
// => 5

Math.max(0, -3)
// => 0
```

## Ajouter à un tableau

```javascript
const values = [1, 2]
values.push(3)
// values vaut [1, 2, 3]
```

</details>
