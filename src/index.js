const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

// la orden que se va a servir y la mesa
// tiempo, producto y a la mesa que se le va a enviar
const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
  });
};

function randomTime(min = 1000, max = 8000) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const waiter = () => {
  let time = randomTime();
  orders(time, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

waiter();
