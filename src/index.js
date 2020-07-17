const fetchData = require('./utils/fetchData.js');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders/';

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      reject(new Error('Error'))
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = (min,max) => {
  return Math.floor(Math.random()* (max - min) + min);
}

const waiter = () => {
  let time=randomTime(1000,8000)
  orders(time, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  var time=randomTime(1000,8000)
  orders(time, menu.hotdog, table[0])
    .then((res) => console.log(res))
      var time=randomTime(1000,8000)
      return orders(time, menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

const waiter3 = async () => {
  try{
    var time=randomTime(1000,8000);
    const order1 = await orders(time, menu.hotdog, table[1]);
    var time=randomTime(1000,8000);
    const order2 = await orders(time, menu.pizza, table[1]);
    var time=randomTime(1000,8000);
    const order3 = await orders(time, menu.hotdog, table[1]);
    Promise.all([order1,order2,order3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  }catch(error){
    console.error(error)
  }
}

const waiter4 = async (url_api) => {
  try {
    var time=randomTime(1000,8000);
    const data = await fetchData(url_api);
    console.log(data)
    const order1 = await orders(time, data.data, table[4])
    var time=randomTime(1000,8000);
    const order2 = await orders(time, data.data, table[4])
    var time=randomTime(1000,8000);
    const order3 = await orders(time, data.data, table[4])
    var time=randomTime(1000,8000);
    const order4 = await orders(time, data.data, table[4])
    Promise.all([order1,order2,order3,order4])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  } catch (error) {
    console.error(error)
  }
}

waiter();
waiter2();
waiter3();
waiter4(API);