const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    // Se puede mejorar especificando de que tipo es el error
    if (time && product && table) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('Se encontro un error');
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(numAleatorio(8000, 1000), table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const numAleatorio = (numMax, numMin) => Math.floor(Math.random() * (numMax - numMin) + numMin);

waiter();