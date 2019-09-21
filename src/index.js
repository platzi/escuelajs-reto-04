const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const MAX_TIME = 8000;
const MIN_TIME = 1000;

const randomTime = () => Math.floor(Math.random() * ((MAX_TIME + 1) - MIN_TIME) + MIN_TIME);

const xhttp = new XMLHttpRequest();

const fetchOrder = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          const result = JSON.parse(xhttp.responseText)
          resolve(result.data);
        }
        else {
          reject({
            status: xhttp.status,
            statusText: xhttp.statusText
          });
        }
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  })
};


const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time && typeof time == 'number') {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      } else {
        reject(`=== Ocurrió un error con el pedido: ${product} :(`);
      }
    }, time);
  });
}

const onResponse = (response) => console.log(response);
const onError = (error) => console.error(`Error: ${error}`); 

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(response => onResponse(response))
    .catch(error => onError(error));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(response => {
      onResponse(response);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then(response =>
      onResponse(response)
    )
    .catch(error => onError(error));
}

const waiter3 = async () => {
  try {
    const [responseA, responseB, responseC] = await Promise.all([
      orders(randomTime(), menu.hotdog, table[1]),
      orders(randomTime(), menu.pizza, table[1]),
      orders(randomTime(), menu.hotdog, table[1]),
    ]);
    console.log(`Acá va todo el pedido de la mesa 2:\n${responseA}\n${responseB}\n${responseC}`);
  } catch (error) {
      onError(error)
  }
}

const waiter4 = async () => {
  try {
    const [responseA, responseB, responseC, responseD] = await Promise.all([
      fetchOrder(API),
      fetchOrder(API),
      fetchOrder(API),
      fetchOrder(API),
    ]);
    console.log(`Acá va todo el pedido de la mesa 5:\n${responseA}\n${responseB}\n${responseC}\n${responseD}`);
  } catch (error) {
      onError(error)
  }
}

waiter();
waiter2();
waiter3();
waiter4();
