var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const xhttp = new XMLHttpRequest();


const fetchOrders = () => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
        else
          reject(API);
      }
    };
    xhttp.open('GET', API, false);
    xhttp.send();
  });
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const randomTime = () => {
  return Math.floor(Math.random() * ((8000+1)-1000) + 1000);
}

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.pizza, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

    orders(randomTime(), menu.hotdog, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  try {
    const orderCustomer1 = orders(randomTime(), menu.pizza, table[1])
    const orderCustomer2 = orders(randomTime(), menu.hamburger, table[1])
    const orderCustomer3 = orders(randomTime(), menu.hotdog, table[1])

    const processOrders = await Promise.all([orderCustomer1, orderCustomer2, orderCustomer3])
    processOrders.forEach((orders) => {
      console.log(orders);
    })
  } catch (error) {
    console.error("Ha ocurrido un error a momento de generar la orden", error);
  }
};


const waiter4 = async () => {
  try {
    const menu1 = fetchOrders();
    const menu2 = fetchOrders();
    const menu3 = fetchOrders();
    const menu4 = fetchOrders();

    const menus = await Promise.all([menu1,menu2,menu3,menu4]);
    let orderList = [];
    menus.forEach((menu) => {
      orderList.push(orders(randomTime(), menu.data, table[1]));
    })

    const processOrders = await Promise.all(orderList)
    processOrders.forEach((order) => {
      console.log(order);
    })
  } catch (error) {
    console.error("Ha ocurrido un error a momento de generar la orden", error);
  }
};



waiter();
waiter2();
waiter3();
waiter4();
