const fetch = require('node-fetch');

const URL_ORDERS = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const TIME_MAX = 8000;
const TIME_MIN = 1000;

//Generar tiempo aleatorio entre 1000 - 8000ms
const randomTime = () => {
  return Math.floor(Math.random() * (TIME_MAX - TIME_MIN) + TIME_MIN);
}

//Envía a cocinar la orden
const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time || !product || !table) {
      reject(`La orden no se puede completar debido a que no contamos con los datos necesarios`)
    }

    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

//Petición a servicio externo por la orden
const fetchOrders = async () => {
  try {
    const response = await fetch(URL_ORDERS);
    const data = await response.json();
    return data.data
  } catch (error) {
    return error
  }

}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

//Genera una orden
const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

//Genera dos órdenes en cadena
//Sirve una y cuando el EventLoop se desocupe sirve la otra D:
const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(response => {
      console.log(response)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then(response => console.log(response))
    .catch((err) => console.error(err));
}

//Genera 3 órdenes y las sirve cuando todas estén listas
const waiter3 = async () => {
  const orderPromises = [];
  orderPromises.push(orders(randomTime(), menu.hotdog, table[1]));
  orderPromises.push(orders(randomTime(), menu.pizza, table[1]));
  orderPromises.push(orders(randomTime(), menu.hotdog, table[1]));

  try {
    let response = await Promise.all(orderPromises);
    response.map(order => console.log(order));
  } catch (error) {
    console.log(error);
  }
}

//Obtiene la orden de un servicio externo,
//Envia a la cocina cuando estén las 4 órdenes listas,
//Sirve las órdenes cuando estén lista
const waiter4 = async () => {
  const fetchPromises = [];

  for(let i = 0; i < 4; i++)
  {
    fetchPromises.push(fetchOrders());
  }

  try {
    let response = await Promise.all(fetchPromises);
    let promises = response.map(order => orders(randomTime(), order, table[4]));
    let orderPromises = await Promise.all(promises);
    orderPromises.map(order => console.log(order));
  } catch (error) {
    console.log(error);
  }
}

waiter();
waiter2();
waiter3();
waiter4();