const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    if (time > 7000) {
      reject(`El pedido ${product} ha superado el tiempo de respuesta de 7 segundos, se ha cancelado`);
    }
  });
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => {
  return Math.floor(Math.random() * 8 + 1) * 1000;
};

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(response => console.log(response))
    .catch(error => console.error(error));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0]).then(response => console.log(response));
  return orders(randomTime(), menu.pizza, table[2])
    .then(response => console.log(response))
    .catch(error => console.error(error));
};

waiter();
waiter2();
