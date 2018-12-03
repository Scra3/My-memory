const prices = [5, 2, 43, 56, 20, 61];

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

console.log(maxPrice(prices))
console.log(minPrice(prices))
console.log(totalPrice(prices))
