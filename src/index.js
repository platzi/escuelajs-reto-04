const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time || !product || !table) {
      reject(
        new Error(
          'Falta alguno de los siguientes datos para preparar la orden: time, product o table'
        )
      );
    } else {
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
      }, time);
    }
  });
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

/**
 * Retorna un valor en mili segundos de forma aleatoria en el rango de
 * 1000ms hasta 8000ms.
 */
function randomTime() {
  const MAX = 9000; // excluded
  const MIN = 1000;
  return Math.floor(Math.random() * (MAX - MIN)) + MIN;
}

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter3 = async () => {
  try {
    let pedido1 = await orders(randomTime(), table[1]);
    let pedido2 = await orders(randomTime(), menu.pizza, table[1]);
    let pedido3 = await orders(randomTime(), menu.hotdog, table[1]);
    console.log('Ordenes listas');
    console.log(pedido1);
    console.log(pedido2);
    console.log(pedido3);
  } catch (err) {
    console.log(new Error(`Hubo un problema en la cocina: ${err}`));
  }
};

// Primer problema
//waiter();
// Segundo problema
//waiter2();
// Tercer problema
waiter3();
