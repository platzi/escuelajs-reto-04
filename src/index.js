const MAX = 1000
const MIN = 8000

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(MIN, MAX), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(MIN, MAX), menu.hamburger, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  
  orders(randomTime(MIN, MAX), menu.hamburger, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

const randomTime = (min, max) => {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}

const waiter3 = async () => {
  const res = []

  res[0] = orders(randomTime(MIN, MAX), menu.hamburger, table[1])
  res[1] = orders(randomTime(MIN, MAX), menu.hotdog, table[1])
  res[2] = orders(randomTime(MIN, MAX), menu.pizza, table[1])

  const responses = await Promise.all(res)

  for(response of responses){
    console.log(response)
  }
};

waiter();
waiter2();
waiter3();