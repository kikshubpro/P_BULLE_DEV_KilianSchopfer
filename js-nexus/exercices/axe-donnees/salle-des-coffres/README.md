# Les Archives

## La salle des coffres

Le registre est enfin lisible. Il faut maintenant **ranger** les artefacts.

Lin vous ouvre la salle des coffres. Chaque coffre a un nom et une capacité limitée. Les artefacts y entrent, en sortent, passent d'un coffre à l'autre.

> « Une donnée rangée au mauvais endroit est une donnée perdue. Et une donnée perdue pendant un déplacement… est perdue deux fois. »

Cette mission combine une **classe avec des getters**, qui décrit l'état d'un coffre, et des **fonctions qui modifient les coffres** qu'elles reçoivent en paramètre.

Vous allez utiliser :

- classes, `constructor` ;
- getters `get` ;
- fonctions qui modifient un objet reçu ;
- `some`, `findIndex`, `splice`, `map`, `reduce`, `find` ;
- `throw` et `try`/`catch` ;
- `import` depuis un autre exercice.

# Prérequis

Cet exercice **réutilise** `upgradeArtifact` de la mission *Classer les fiches d'artefacts* (`../fiches-artefacts/artefacts.js`).

# Instructions

Complétez le fichier `coffres.js`.

Les artefacts ont la même forme que dans les missions précédentes :

```javascript
{ id: 1, name: 'Orbe', power: 75 }
```

## 0. Importer

Importez `upgradeArtifact` depuis `../fiches-artefacts/artefacts.js`.

## 1. La classe `Vault`

Le constructeur reçoit `name` et `capacity`. Il initialise :

- `this.name` ;
- `this.capacity` ;
- `this.artifacts` : un tableau vide (propre à chaque coffre).

```javascript
const alpha = new Vault('Alpha', 3);
```

## 2. Les getters

Ajoutez à la classe quatre getters :

| Getter       | Valeur                                                        |
|--------------|---------------------------------------------------------------|
| `count`      | nombre d'artefacts du coffre                                  |
| `totalPower` | somme des puissances des artefacts (avec `reduce`)            |
| `isFull`     | `true` si la capacité est atteinte                            |
| `summary`    | un **nouvel objet** `{ name, count, totalPower, ids }`        |

```javascript
alpha.count       // pas de parenthèses : c'est un getter
// => 0

alpha.summary
// => { name: 'Alpha', count: 2, totalPower: 165, ids: [1, 3] }
```

Un getter est recalculé à chaque lecture : si le contenu du coffre change, `count` change aussi. En revanche, un résumé déjà obtenu avec `summary` ne doit pas changer.

## 3. Ranger un artefact

En dehors de la classe, implémentez :

```javascript
storeArtifact(vault, artifact)
```

La fonction **modifie** le coffre reçu :

1. si le coffre est plein, elle lance l'erreur `Coffre <nom> plein` ;
2. si un artefact avec le même `id` est déjà présent, elle lance l'erreur `Artefact <id> déjà présent` ;
3. sinon, elle ajoute l'artefact à la fin de `vault.artifacts`.

Elle ne retourne rien.

## 4. Retirer un artefact

Implémentez :

```javascript
retrieveArtifact(vault, id)
```

La fonction retire du coffre l'artefact qui a cet `id` et le retourne. S'il n'existe pas, elle retourne `undefined` sans rien modifier.

Utilisez `findIndex` et `splice`.

## 5. Améliorer tout un coffre

Implémentez :

```javascript
upgradeVault(vault, bonus)
```

La fonction remplace chaque artefact du coffre par une **copie améliorée** obtenue avec `upgradeArtifact`.

Le coffre change, mais les objets artefacts d'origine, eux, ne doivent **pas** être modifiés :

```javascript
const orbe = { id: 1, name: 'Orbe', power: 75 };
storeArtifact(alpha, orbe);
upgradeVault(alpha, 10);

alpha.artifacts[0].power  // => 85
orbe.power                // => 75
```

## 6. Déplacer un artefact

Implémentez :

```javascript
moveArtifact(source, target, id)
```

La fonction déplace l'artefact `id` de `source` vers `target` en réutilisant `retrieveArtifact` et `storeArtifact`.

- elle retourne `true` si le déplacement a réussi ;
- elle retourne `false` si l'artefact n'est pas dans `source` ;
- si `target` refuse l'artefact (plein, ou identifiant déjà présent), l'artefact doit **revenir dans `source`** et la fonction retourne `false`.

La fonction ne doit jamais lancer d'erreur.

## 7. Répartir des artefacts

Implémentez :

```javascript
distributeArtifacts(artifacts, vaults)
```

Chaque artefact est rangé dans le **premier coffre qui a encore de la place**. La fonction modifie les coffres et retourne le tableau des artefacts qui n'ont pu être rangés nulle part.

```javascript
const alpha = new Vault('Alpha', 1);
const beta = new Vault('Beta', 1);

distributeArtifacts([orbe, cristal, sceptre], [alpha, beta]);
// => [sceptre]
// alpha contient orbe, beta contient cristal
```

## 8. Comprendre

À la fin de l'exercice, soyez capable d'expliquer :

- la différence entre une propriété (`name`) et un getter (`count`) ;
- pourquoi `storeArtifact` modifie le coffre alors qu'elle ne retourne rien ;
- pourquoi `upgradeVault` modifie le coffre sans modifier les artefacts d'origine ;
- pourquoi `moveArtifact` a besoin de `try`/`catch`.

---

### À rechercher si nécessaire

- `JavaScript class getter`
- `JavaScript array some`
- `JavaScript array findIndex`
- `JavaScript array splice`
- `JavaScript try catch`

<details>
<summary>Aides</summary>

## Getter

```javascript
class Box {
  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }
}

const box = new Box();
box.size; // => 0
box.items.push('clé');
box.size; // => 1
```

## Retirer un élément à une position

```javascript
const values = ['a', 'b', 'c'];
const removed = values.splice(1, 1); // removed vaut ['b']
// values vaut ['a', 'c']
```

## Rattraper une erreur

```javascript
try {
  riskyOperation();
} catch {
  // que faire si ça échoue ?
}
```

</details>
