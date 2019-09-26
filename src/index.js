const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        )
      } catch (error) {
        reject(
          `=== ${error} Erro en el pedido: ${product}, para la ${table}`
        )
      }
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


/* ============== Reto 1 ==================== */
/*
 Se agrega la función getRandomTime para obtener el tiempo de
 preparación de la orden.
 */

const waiter = () => {
  console.log('Reto 1')
  orders(6000, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

function getRandomTime() {
  min = 1000;
  max = 8000;
  randomTime = Math.floor(Math.random() * (max - min)) + min;
  return randomTime;
}

/* ============== Reto 2 ==================== */
/*
 Se agrega la función getRandomOrden, getRandomTable para obtener
 la orden en que se atienden las mesas y la orden de los clientes
 */

function getRandomOrden() {
  min = 0;
  max = 3;
  randomOrden = Math.floor(Math.random() * (max - min)) + min;
  return menu2[randomOrden];
}

function getRandomTable() {
  min = 0;
  max = 2;
  randomTable = Math.floor(Math.random() * (max - min)) + min;
  return tableWaiter2[randomTable];
}

const waiter2 = () => {
  console.log('Reto 2')
  orders(getRandomTime(), getRandomOrden(), getRandomTable())
    .then(res => {
      console.log(res);
      if (tableWaiter2[randomTable] == 'Mesa 1') {
        randomTable = 1;
      } else {
        randomTable = 0;
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

/* ============== Reto 3 ==================== */
/*
 Se agrega la función numberPeople, takeOrders y cookOrders para obtener
 el número de personas que se sientan en la mesa, la toma de orden y la 
 preparación de las órdenes
 */

function numberPeople() {
  min = 1;
  max = 4;
  randomPeople = Math.floor(Math.random() * (max - min)) + min;
  console.log(`Numero de personas en la mesa: ${randomPeople}`)
  return randomPeople;
}

const takeOrders = (infoPeople, table) => {
  let arrayOrders = [];
  for (let i = 0; i < infoPeople; i++) {
    let product = getRandomOrden();
    arrayOrders[i] = product;
    console.log(`### Orden: ${product} para ${table}`);
  }
  return arrayOrders;
};

const cookOrders = async (ordersPeople, table) => {
  const promises = ordersPeople.map(cookOrder);
  await Promise.all(promises);
  console.log(`Se entregan ordenes de la mesa ${table}`);
};

async function cookOrder(item) {
  await order(item).then(res => {
    console.log(res);
  });
}

function order(item) {
  let timeCook = getRandomTime();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(
          `=== Pedido servido: ${item}, tiempo de preparación ${timeCook}ms`
        )
      } catch (error) {
        reject(
          `=== ${error} Erro en el pedido: ${item}`
        )
      }
    }, timeCook);
  });
}

function onError(error) {
  console.log(`Ocurrio el sigueinte error: ${error}`);
}


const waiter3 = async () => {
  console.log('Reto 3')
  try {
    let infoPeople = await numberPeople();
    let ordersPeople = await takeOrders(infoPeople, table[1]);
    await cookOrders(ordersPeople, table[1]);
  } catch (error) {
    onError(error);
  }
};

//waiter();
//waiter2();
waiter3();
