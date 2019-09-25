const fetch = require("node-fetch");
const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    reject(`Algo salio maal :(`)

    }, time);
  });
}

const randomTime = () => {
  return Math.floor((Math.random() * 8000) + 1000)
} 

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
  
    .then((res) => {console.log(res); })
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.pizza, table[2])
  .then((res) => {console.log(res); return orders(randomTime(), menu.hotdog, table[0])})
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
};

waiter();
waiter2();

const waiter3 = async () => {
  try {
  const replyHotDog = await orders(randomTime(), menu.hotdog, table[1]);
  const replyPizza = await orders(randomTime(), menu.pizza, table[1]);
  const resplyHotdog = await orders(randomTime(), menu.hotdog, table[1]);
  console.log(replyHotDog);
  console.log(replyPizza);
  console.log(resplyHotdog);
  }
  catch(error) {
    console.error(error);
  }
};

waiter3();

const fetchOrders = async (time, table) => {
  try {
  const data = await fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders/');
  const showData = await data.json();
  console.log(`### Orden: ${showData.data} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve(`=== Pedido servido: ${showData.data}, tiempo de preparación ${time}ms para la ${table}`);
    reject(`Algo salio maal :(`)

    }, time);
  });
  }
  catch(error) {
    console.error("Lo siento pero la API(digo cocina) le dio por no funcionar");
  }
};

const waiter4 = async () => 
{
    const order1 = await fetchOrders(randomTime() , table[4]);
    const order2 = await fetchOrders(randomTime() , table[4]);
    const order3 = await fetchOrders(randomTime() , table[4]);
    const order4 = await fetchOrders(randomTime() , table[4]);

    console.log(order1);
    console.log(order2);
    console.log(order3);
    console.log(order4);

}

waiter4();








