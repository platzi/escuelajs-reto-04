const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (true) {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      } else {
        reject(`!== Pedido falló: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }

    }, time);
  });
}
const randomTime = () => {
  return Math.floor(Math.random() * (8000 - 1000) + 1000);
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

// orders(randomTime(), menu.hotdog, table[0]);
// orders(randomTime(), menu.pizza, table[2]);

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      orders(randomTime(), menu.pizza, table[2])
        .then((res) => console.log(res));
      console.log(res);
    })

    .catch((err) => console.error(err));

};
async function waiter3() {
let pedido1 = await orders(randomTime(), menu.hotdog, table[1]);
let pedido2 = await orders(randomTime(), menu.pizza, table[1]);
let pedido3 = await orders(randomTime(), menu.hotdog, table[1]);
console.log(pedido1);
console.log(pedido2);
console.log(pedido3);
};


waiter();
waiter2();
waiter3();


