const fetch = require("node-fetch");


async function fetchOrders() {
  const url_api = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
  let response = await fetch(url_api);
  let data = await response.json();
  return orders(randomTime(),data.data,'Mesa X');
}

//Primer Reto
const randomTime = () => {
  const min = 1000;
  const max = 8000;
  var rand = Math.floor(Math.random() * (min - max)) + max;
  return rand;
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    try {
      if (time == null || product == null || table == null) {
        reject("parametros nulos");
      }
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
      }, time);
    } catch (error) {
      reject(error);
    }
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

//Segundo Reto
const waiter2 = () => {
  orders(randomTime(), menu.hamburger, table[1])
    .then(res => {
      console.log(res);
      orders(randomTime(), menu.pizza, table[2])
        .then(res => console.log(res))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};

//Tercer Reto
const waiter3 = async () => {
  var persona1 = orders(randomTime(), menu.hamburger, table[0]);
  var persona2 = orders(randomTime(), menu.hotdog, table[0]);
  var persona3 = orders(randomTime(), menu.pizza, table[0]);
  resultado = await Promise.all([persona1, persona2, persona3]);
  for (let index = 0; index < resultado.length; index++) {
    console.log(resultado[index]);
  }
};

//Cuarto Reto
const waiter4 = async () => {
  var pedidos = [
    fetchOrders(),
    fetchOrders(),
    fetchOrders(),
    fetchOrders()
  ];
  var resultadoP = await Promise.all(pedidos);
  for (let index = 0; index < resultadoP.length; index++) {
    console.log(resultadoP[index]);
  }
};
//waiter();
//waiter2();
//waiter3();
waiter4();
