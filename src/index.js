
const maxMiliSecons = 8000;
const minMiliSecons = 1000;

const randomTime = () => {
  return Math.floor(Math.random() *
    (maxMiliSecons - minMiliSecons) + minMiliSecons);
}





const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {


    if (time && product && table) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }
    else {
      reject(`La order del cliente no se pudo completar`);
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
  const timeOrder = randomTime();
  orders(timeOrder, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = async () => {

  const timeOrder = randomTime();
  const getOrderTable1 = await orders(timeOrder, menu.hotdog, table[0]);
  console.log(getOrderTable1);
  const getOrderTable3 = await orders(timeOrder, menu.pizza, table[2]);
  console.log(getOrderTable3);
}

const waiter3 = async () =>{

  const listOrders = [
    orders(timeOrder, menu.hotdog, table[1]),
    orders(timeOrder, menu.hotdog, table[1]),
    orders(timeOrder, menu.hotdog, table[1])
  ]

  const getOrderTable2 = Promise.all(listOrders);

  console.log(getOrderTable2);


};

waiter();
waiter2();
