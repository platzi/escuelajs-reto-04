const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      reject(new Error('Error'))
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = (min,max) => {
  return Math.floor(Math.random()* (max - min) + min);
}

const waiter = () => {
  let time=randomTime(1000,8000)
  orders(time, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  var time=randomTime(1000,8000)
  orders(time, menu.hotdog, table[0])
    .then((res) => console.log(res))
      var time=randomTime(1000,8000)
      return orders(time, menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

waiter();
waiter2();