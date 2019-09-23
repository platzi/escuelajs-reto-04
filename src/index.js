const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhttp = new XMLHttpRequest();

const API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";

function fetchData(url_api) {
  return new Promise((resolve, rejected) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          let response = JSON.parse(xhttp.responseText);
          resolve(response);
        } else rejected(url_api);
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time !== null) {
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
      }, time);
    } else {
      reject("el tiempo no existe 😲");
    }
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];
const ramdonTime = (max = 8000, min = 1000) =>
  Math.floor(Math.random() * (max - min) + min);
const fetchOrders = async () => {
  let response = await fetchData(API);
  return response.data;
};

const waiter = () => {
  orders(ramdonTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  orders(ramdonTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(ramdonTime(), menu.pizza, table[2]);
    })
    .then(res => {
      console.log(res);
    });
};

const waiter3 = async () => {
  try {
    const pedido1 = await orders(ramdonTime(), menu.hotdog, table[1]);
    const pedido2 = await orders(ramdonTime(), menu.pizza, table[1]);
    const pedido3 = await orders(ramdonTime(), menu.hotdog, table[1]);

    console.log(pedido1);
    console.log(pedido2);
    console.log(pedido3);
  } catch (error) {
    console.log(`No pudimos entregar tu pedido porque ${error}`);
  }
};

const waiter4 = async () => {
  try {
    let pedido1 = await fetchOrders();
  } catch (error) {
    pedido1 = menu.hotdog;
  }

  try {
    let pedido2 = await fetchOrders();
  } catch (error) {
    pedido2 = menu.pizza;
  }

  try {
    let pedido3 = await fetchOrders();
  } catch (error) {
    pedido3 = menu.hamburger;
  }
  try {
    let pedido4 = await fetchOrders();
  } catch (error) {
    pedido4 = menu.hotdog
  }
  const orden1 = await orders(ramdonTime(), pedido1, table[1]);
  const orden2 = await orders(ramdonTime(), pedido2, table[1]);
  const orden3 = await orders(ramdonTime(), pedido3, table[1]);
  const orden4 = await orders(ramdonTime(), pedido4, table[1]);

  console.log(orden1)
  console.log(orden2)
  console.log(orden3)
  console.log(orden4)
};

waiter();
waiter2();
waiter3();
waiter4();