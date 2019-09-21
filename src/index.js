function randomTime(min = 1000, max = 8010) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time >= 8000) {
      return reject(`El mesero se tardó más de lo permitido (${time} ms). El cliente se esfumó`);
    }
    setTimeout(() => {
      return resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);

  });
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

const waiter2 = () => {
  console.log("-------- Ejecucion metodo Waiter 2 utilizando then y atentidos mesa por mesa -------- ")
  console.log(`.... Iniciando atencion ....`)
  const waiterOrders = []
  let pedidoMesa1 = orders(randomTime(), menu.hotdog, table[0]);


  pedidoMesa1
    .then(responseMesa1 => {
      console.log(`El mesero atendio a la mesa 1`)
      console.log(responseMesa1);
      let pedidoMesa3 = orders(randomTime(), menu.pizza, table[2]);
      return pedidoMesa3
    })
    .then(responseMesa3 => {
      console.log(responseMesa3);
      return null
    })
    .then(response => {
      console.log(`:::::: FIN :::::::: El mesero 2 atendió a la mesa ${table[0]} y a la mesa ${table[2]}`);
    });
}


async function waiter3() {
  console.log("Ejecucion metodo Waiter 3 utilizando async await y en paralelo")
  const waiterOrders = []
  const attendedTable = table[1];
  waiterOrders.push(orders(randomTime(), menu.hotdog, attendedTable));
  waiterOrders.push(orders(randomTime(), menu.pizza, attendedTable));
  waiterOrders.push(orders(randomTime(), menu.hotdog, attendedTable));
  waiterOrders.push(orders(randomTime(), menu.hamburger, attendedTable));

  const resultOrders = await Promise.all(waiterOrders);
  // console.log(resultOrders);

  resultOrders.forEach(resultOrder => {
    console.log(`${resultOrder}`)

  })

  console.log(`El mesero 3 atendió a la mesa ${attendedTable}. Entregó los platillos al mismo tiempo. Los clientes están contentos`)
  // .then((res) => console.log(res))
  // .catch((err) => console.error(err));
}
// waiter();
waiter2();
// waiter3();