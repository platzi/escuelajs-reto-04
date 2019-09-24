const min = 1000;
const max = 8000;
const fetch = require("node-fetch");
const prompt = require("prompt");

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const randomTime = (min, max) => {
  return Math.trunc(Math.random() * (max - min) + min);
};

// funciones para atender ordenes.
const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (product && table) {
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
      }, time);
    } else {
      reject(Error("Error en el pedido"));
    }
  });
};

async function fetchOrders(table) {
  console.log(`### Orden para ${table}`);
  const urlAPI = " https://us-central1-escuelajs-api.cloudfunctions.net/orders";
  try {
    const response = await fetch(urlAPI);
    if (response.status >= 400) {
      throw new Error("Mala respuesta del servidor");
    }
    const data = await response.json();
    return `Pedido servido ${data.data} para la mesa ${table}`;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

// funciones de los meseros
const waiter = () => {
  orders(randomTime(min, max), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(min, max), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(randomTime(min, max), menu.pizza, table[2]);
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

async function waiter3() {
  // var result1 = await orders(randomTime(min,max),menu.hotdog, table[1]);
  // var result2 = await orders(randomTime(min,max),menu.pizza, table[1]);
  // var result3 = await orders(randomTime(min,max),menu.hotdog, table[1]);
  try {
    const [result1, result2, result3] = await Promise.all([
      orders(randomTime(min, max), menu.hotdog, table[1]),
      orders(randomTime(min, max), menu.pizza, table[1]),
      orders(randomTime(min, max), menu.hotdog, table[1])
    ]);

    console.log(result1);
    console.log(result2);
    console.log(result3);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function waiter4() {
  const [orden1, orden2, orden3, orden4] = await Promise.all([
    fetchOrders(table[4]),
    fetchOrders(table[4]),
    fetchOrders(table[4]),
    fetchOrders(table[4])
  ]);

  console.log(orden1);
  console.log(orden2);
  console.log(orden3);
  console.log(orden4);
}

console.log("Ingrese la opción deseada:");
console.log("1. Primer problema.");
console.log("2. Segundo problema.");
console.log("3. Tercer problema.");
console.log("4. Cuarto problema");

prompt.start();

prompt.get(["opcion"], function(error, result) {
  if (error) {
    console.log(error);
    return 0;
  }
  const opcion = result.opcion;
  switch (Number(opcion)) {
    case 1:
      waiter();
      break;
    case 2:
      waiter2();
      break;
    case 3:
      waiter3();
      break;
    case 4:
      waiter4();
      break;
    default:
      console.log("algo salió mal :(");
      break;
  }
});
