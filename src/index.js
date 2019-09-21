// Reto 1:
const randomTime = () => {
  const TIME_MIN = 1000;
  const TIME_MAX = 8000;
  return TIME_MIN + Math.floor((TIME_MAX - TIME_MIN + 1) * Math.random());
}

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
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
// Reto 2:
const waiter2 = () => {
  orders(randomTime(),menu.hotdog,table[0])
    .then((res) => console.log(res) )
    .catch((err) => console.log(err));
  orders(randomTime(),menu.pizza,table[2])
    .then((res) => console.log(res) )
    .catch((err) => console.log(err));
}

// Reto 3: 
const waiter3 = async () => {
  var order1 = orders(randomTime(),menu.hotdog,table[1])
  var order2 = orders(randomTime(),menu.hamburger,table[1])
  var order3 = orders(randomTime(),menu.pizza,table[1])

  try { 
    const res = await Promise.all([order1, order2, order3]);
    res.map(any => console.log(any));
  } catch(e){}
}

waiter();
// Reto 2:
waiter2();
// Reto 3:
waiter3()
