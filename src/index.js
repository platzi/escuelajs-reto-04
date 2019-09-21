const axios = require('axios').default;
const MIN_TIME = 1000;
const MAX_TIME = 8000;
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      } catch (error) {
        reject(`=== Error sirviendo pedido: ${product} no pudo ser servido en la mesa ${table} en un tiempo de ${time}`);
      }
    }, 0);
  });
}

const randomTime = () => {
  return Math.floor(Math.random() * (MAX_TIME - MIN_TIME)) + MIN_TIME;
}

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((response) => console.log(response))
    .catch((error) => {
      console.error(error);
    });
}

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((response) => {
      console.log(response);
    })
    .then(orders(randomTime(), menu.pizza, table[2])
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      }))
    .catch((error) => {
      console.error(error);
    });
}

const waiter3 = async () => {
  try {
    const order1 = await orders(randomTime(), menu.hotdog, table[1]);
    const order2 = await orders(randomTime(), menu.hamburger, table[1]);
    const order3 = await orders(randomTime(), menu.hotdog, table[1]);

    console.log(order1);
    console.log(order2);
    console.log(order3);
  } catch (error) {
    console.error(error);
  }
}

const waiter4 = async () => {
  try {
    const firstOrderValue = await getOrderFromApi('uno');
    const secondOrderValue = await getOrderFromApi('dos');
    const thirdOrderValue = await getOrderFromApi('tres');
    const fourthOrderValue = await getOrderFromApi('cuatro');
    const order1 = await orders(randomTime(), firstOrderValue, table[4]);
    const order2 = await orders(randomTime(), secondOrderValue, table[4]);
    const order3 = await orders(randomTime(), thirdOrderValue, table[4]);
    const order4 = await orders(randomTime(), fourthOrderValue, table[4]);

    console.log(order1);
    console.log(order2);
    console.log(order3);
    console.log(order4);
  } catch (error) {
    console.log(error);
  }

}

const getOrderFromApi = (order) => {
  return new Promise((resolve, reject) => {
    axios.get(API).then(response => {
      resolve(response.data.data);
    }).catch(error => {
      console.log(error);
      reject(`Error generado el pedido ${order}`);
    })
  });
}

waiter();

waiter2();

waiter3();

waiter4();