const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time || !product || !table) {
      reject(
        `=== Error al realizar el pedido, valor erroneo tiempo: ${time} producto: ${product} mesa: ${table}`
      );
    } else if (isNaN(time)) {
      reject(`=== El valor del tiempo no es numerico tiempo: ${time}`);
    } else if (time > 8000) {
      reject(`=== El tiempo del pedido es mayor al esperado tiempo: ${time}`);
    }
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

function randomTime() {
  return Math.floor(Math.random() * 7000 + 1000);
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err))
    .then(() => {
      orders(randomTime(), menu.pizza, table[2])
        .then(res => console.log(res))
        .catch(err => console.error(err));
    });
};

waiter();
waiter2();
