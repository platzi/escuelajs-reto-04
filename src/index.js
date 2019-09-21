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
const ramdonTime = (max = 8000, min = 1000) => Math.floor(Math.random() * (max - min) + min);

const waiter = () => {
  orders(ramdonTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(ramdonTime(), menu.pizza, table[1])
    .then(res => {
      console.log(res)
      return orders(ramdonTime(), menu.pizza, table[2])
    })
    .then(res => {
      console.log(res)
    })
}

waiter();
waiter2();