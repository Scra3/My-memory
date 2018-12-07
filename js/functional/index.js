const names = ['jean', 'benedicte', 'allban'];
const objectNames = [{ name: 'jean' }, { name: 'benedicte' }, { name: 'allban' }];

const sortStrings = strings => attr => strings.sort((nameA, nameB) => {
  if (attr) {
    nameA = nameA[attr];
    nameB = nameB[attr];
  }
  return nameA.localeCompare(nameB);
});

const sortNames = sortStrings(names)(null);
const sortObject = sortStrings(objectNames);
const sortObjectNamesByName = sortObject('name');

console.log(sortNames);
console.log(sortObjectNamesByName);

/* FIRST CLASS CITIZEN
  En js les fonctions sont des objets de pemière classe
  - Être afféctée à des variables ou des structures de données.
  - Être passée comme paramètre à une fonction
  - Être retounée par une fonction
*/

function legacyFunction() {
  function secondFunction() {
    console.log('JS');
  }
  return secondFunction();
}

const newFunction = () => console.log("JS2");

legacyFunction();
newFunction();

/* FONCTIONS PURES
  Est une fonction dont le résultat ne dépend que des arguments et
  non d’un état externe, et qui n’a pas d’effet de bord.
*/

var counter = 0;
const add = () => counter += 1;
const addPure = value => value + 1;

/*IMMUTABILITÉ*/

const item = 2;
const item2 = Object.freeze({ name: 'alban', additionals: { surname: 'scra' } });
item2.additionals.surname = 'rolo';

/* FONCTION D'ORDRE SUPÉRIEUR
  Prend une ou plusieurs fonctions en entrée et renvoie une fonction.
*/

const jean = { name: 'jean', color: 'blue' }
const addPriceToItem = item => price => ({ ...item, price });
const addPriceToJean = addPriceToItem(jean);

// console.log('FONCTION ORDRE SUPÉRIEUR')
// console.log(addPriceToJean(10))

/* MONOIDES
  Fonction qui prend en paramètre un élément d'un type puis un autre élément
  du même type.
  En résultat, on retourne un élément du même type.
*/

const increment = num => num + 1;
const square = num => num * num;

// console.log('MONOIDES')
// console.log(increment(2))
// console.log(square(2))

/* Functors
  Les foncteurs sont des objet sur lesquels on peut réaliser une transformation,
  par exemple une collection de a où l'on peut appliquer une fonction a -> b pour retourner une collection de b.
*/

const prices = [5, 2, 43, 56, 20, 61];

const legacyMaxPrice = function(prices) {
  let maxPrice = 0;
  for(var i = 0; i <= prices.length; i++) {
    if(prices[i] > maxPrice)
      maxPrice = prices[i];
  }

  return maxPrice;
}

const maxPrice = prices => prices.reduce((maxPrice, price) =>
  price > maxPrice ? price : maxPrice
  , 0
);

const minPrice = prices => prices.reduce((minPrice, price) =>
  minPrice === 0 || price < minPrice ? price : minPrice
  , 0
);

const totalPrice = prices => prices.reduce((total, price) =>
  total += price
  , 0
);

/* CLOSURE
  Fonction qui fait intervenir des variables indépendantes.
  Ce sont des fonctions qui se souviennent de l'environnement dans lequel elles
  ont été crées.
*/

const closure = function() {
  let dev = 'Alban'; // argument fermé
  function printDev() {
    console.log(dev);
  }
  return printDev()
}

// application partielle à une fonction curryfiée
const clusure2 = xp => dev => console.log(xp, dev);
const printDevWithXp = clusure2(2);

// closure()
// printDevWithXp('JeSuisUnDev')

/*CURRYFICATION
  Transformation d'une fonction à plusieurs arguments en une fonction à un seul
  argument qui retourne une fonction sur le reste des arguments
*/

/*DESTRUCTURATION*/

const developerNames = { first: 'Alban', second : 'Florence' };
const { first: firstDev, second: secondDev } = developerNames;
const { first } = developerNames;

const developerLastNames = ['Bertolini', 'Denier'];
const [ dev1, dev2 ] = developerLastNames;

// console.log(first)
// console.log(firstDev)
// console.log(dev2)

/* POINT FREE
  Écrire des fonctions en composant d'autres fonctions sans jamais
  spécifier le paramètre sur lequel s'applique la suite de fonction.
*/

const developers = [
  { name: 'alban', xp: '53', languages: ['JS'] },
  { name: 'Jeje', xp: '5', languages: ['JS'] },
  { name: 'Luc', xp: '5', languages: ['Java'] }
];

const predicate = field => query => developer => developer[field].includes(query);
const javaScriptDev = developers => developers.filter(predicate('languages')(`JS`));

// console.log(javaScriptDev(developers))
