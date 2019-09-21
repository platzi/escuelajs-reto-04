const min = 1000;
const max = 8000;

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (product && table) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject(Error('Error en el pedido'));
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = (min, max) => {
  return Math.trunc(Math.random() * (max - min) + min);
}

const waiter = () => {
  orders(randomTime(min,max), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(min,max),menu.hotdog, table[0])
  .then( (res) => {
    console.log(res)
    return orders(randomTime(min,max),menu.pizza, table[2])
  })
  .then ( (res) => console.log(res))
  .catch( (err) => console.error(err));
}

//waiter();
waiter2();