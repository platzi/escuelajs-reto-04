const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time ||  !product || !table) {
      reject("Incomplete order, please complete all arguments")
    }
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const randomTime = (min, max) => {
  const random = Math.random() * (max - min) + min;
  return Math.ceil(random)
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  const orderTime = randomTime(1000, 8000)
  orders(orderTime, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();
