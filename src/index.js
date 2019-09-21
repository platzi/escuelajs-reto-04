const fetch = require('node-fetch')

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
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

const randomTime = () => {
  return Math.floor((Math.random() * 8) * 1000)
}

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  };
  
const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
  .then((res) => console.log(res))
  .then(() => {
    return orders(randomTime(), menu.pizza, table[2])
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
}

const waiter3 = async () => {
  try {
    const orden1 = await orders(randomTime(), menu.hotdog, table[1])
    const orden2 = await orders(randomTime(), menu.pizza, table[1])
    const orden3 = await orders(randomTime(), menu.hotdog, table[1])
    console.log(orden1)
    console.log(orden2)
    console.log(orden3)
  } catch (error) {
    console.log(`Ocurrio un error ${error}`)
  }
}

const URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'

const getData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(`Ocurrio un error ${error}`)
  }
};

const waiter4 = async () => {
  try {
    // let data1 = await getData(URL)
    // console.log(data1)
    const orden1 = await getData(URL)
    const orden2 = await getData(URL)
    const orden3 = await getData(URL)
    const orden4 = await getData(URL)
    console.log(orden1.data)
    console.log(orden2.data)
    console.log(orden3.data)
    console.log(orden4.data)
  } catch (error) {
    console.log(`Ocurrio un error ${error}`)
  }
}

waiter()
waiter2()
waiter3()
waiter4()
