const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {

    if (!time || !product || !table) {
      reject(console.error('La orden no esta completa'))
    }

    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const constants = { 
    MIN_VALUE : 1000, 
    MAX_VALUE : 8000,
    API_URL: 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => {
  let randomNumber = Math.round(Math.random() * constants.MAX_VALUE)
  return (randomNumber < constants.MIN_VALUE) ? constants.MIN_VALUE : randomNumber
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((error) => console.error(`Ocurrió un problema con el mesero 1: ${error}`));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then((res) => console.log(res))
    .catch((error) => console.error(`Ocurrió un problema con el mesero 2: ${error}`))
};

const waiter3 = async() => {
  let table2Order = [menu.hotdog, menu.pizza, menu.hotdog]
  let tablesOrder = table2Order.map(order => orders(randomTime(), order, table[1]))
 
   try {
      const orderForTable2 = await Promise.all(tablesOrder)
      console.log(orderForTable2)
   } catch (error) {
      console.error(`Ocurrió un problema con el mesero 3: ${error}`)
   }
};

const fetch = require('node-fetch');

const fetchOrders = async() => {
  try {
    let fetchOrder = await fetch(constants.API_URL)
    let orderInfo = await fetchOrder.json();
    return orders (randomTime(), orderInfo.data, table[4])
  } catch (error) {
    console.error(`Algo salio mal :( : ${error}`)
  }
}



const waiter4 = async() => {
  const APIOrder = [fetchOrders(), fetchOrders(), fetchOrders(), fetchOrders()]
   try {
      const orderFromAPI = await Promise.all(APIOrder)
      console.log(orderFromAPI)
   } catch (error) {
      console.error(`Ocurrio un error con el mesero 4: ${error}`)
   }
};


// waiter();
// waiter2();
// waiter3();
waiter4();