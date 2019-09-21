const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

// la orden que se va a servir y la mesa
// tiempo, producto y a la mesa que se le va a enviar
const orders = (time, product, table) => {
  return new Promise((resolve, reject) => {
    if (product) {
      console.log(`### Orden: ${product} para ${table}`);
      setTimeout(() => {
        try {
          resolve(
            `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
          );
        } catch (e) {
          reject(`Lo sentimos :( ${e}`);
        }
      }, time);
    } else {
      reject(`Lo sentimos, pedido no existente para ${table}`);
    }
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

const waiter2 = () => {
  let time = randomTime();
  orders(time, menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      time = randomTime();
      orders(time, menu.pizza, table[2]).then(result => console.log(result));
    })
    .catch(err => console.error(err));
};

waiter();
waiter2();
