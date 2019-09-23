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

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza'
};

const menu2 = ['Combo Hamburguesa', 'Combo Hot Dogs', 'Combo Pizza'];

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const tableWaiter2 = ['Mesa 1', 'Mesa 3'];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

/* var min = 1000;
var max = 8000;

function getRandomTime(min, max) {
  randomTime = Math.floor(Math.random() * (max - min)) + min
  return randomTime;
} */

function getRandomTime() {
  min = 1000;
  max = 8000;
  randomTime = Math.floor(Math.random() * (max - min)) + min;
  return randomTime;
}

function getRandomOrden() {
  min = 0;
  max = 3;
  randomOrden = Math.floor(Math.random() * (max - min)) + min;
  /* console.log(randomOrden)
  console.log(menu2[randomOrden]) */
  return menu2[randomOrden];
}

function getRandomTable() {
  min = 0;
  max = 2;
  randomTable = Math.floor(Math.random() * (max - min)) + min;
  console.log('randomTable :', randomTable);
  return tableWaiter2[randomTable];
}

const waiter2 = () => {
  orders(getRandomTime(), getRandomOrden(), getRandomTable())
    .then(res => {
      console.log('Primera orden', tableWaiter2[randomTable]);
      console.log(res);
      if (tableWaiter2[randomTable] == 'Mesa 1') {
        randomTable = 1;
        console.log('if ', tableWaiter2[randomTable]);
      } else {
        randomTable = 0;
        console.log('else ', tableWaiter2[randomTable]);
      }
      return orders(
        getRandomTime(),
        getRandomOrden(),
        tableWaiter2[randomTable]
      );
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
};

//waiter();
waiter2();
