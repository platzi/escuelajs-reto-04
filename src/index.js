const TIEMPO1 = 1000;
const TIEMPO2 = 8000;

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};
const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (
      product != "Combo Hamburguesa" &&
      product != "Combo Hot Dogs" &&
      product != "Combo Pizza"
    ) {
      resolve(
        `=== El ${product}, no lo tenemos disponible en este momento, le ofrecemos una disculpa.`
      );
    }

    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
  });
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const numAleatorio = (minimo, maximo) => {
  return Math.floor(Math.random() * (maximo + 1 - minimo) + minimo);
};
const waiter = () => {
  const tiempo = numAleatorio(TIEMPO1, TIEMPO2);
  orders(tiempo, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  const tiempo = numAleatorio(TIEMPO1, TIEMPO2);
  orders(tiempo, menu.hamburger, table[0]).then(function(res1) {
    console.log(res1);
    orders(tiempo, menu.hamburger, table[2]).then(function(res2) {
      console.log(res2);
    });
  });
};

async function waiter3() {
  let response1 = await orders(
    numAleatorio(TIEMPO1, TIEMPO2),
    menu.hamburger,
    table[1]
  );
  let response2 = await orders(
    numAleatorio(TIEMPO1, TIEMPO2),
    menu.hotdog,
    table[1]
  );
  let response3 = await orders(
    numAleatorio(TIEMPO1, TIEMPO2),
    menu.pizza,
    table[1]
  );

  return console.log(` ${response1} + \n ${response2} + \n ${response3}`);
}

async function waiter4() {
  const response = await consultaAPI().then(data => data);

  const PEDIDO1 = Object.values(response[0]);
  const PEDIDO2 = Object.values(response[1]);
  const PEDIDO3 = Object.values(response[2]);
  const PEDIDO4 = Object.values(response[3]);

  let orden1 = await orders(numAleatorio(TIEMPO1, TIEMPO2), PEDIDO1, table[4]);
  let orden2 = await orders(numAleatorio(TIEMPO1, TIEMPO2), PEDIDO2, table[4]);
  let orden3 = await orders(numAleatorio(TIEMPO1, TIEMPO2), PEDIDO3, table[4]);
  let orden4 = await orders(numAleatorio(TIEMPO1, TIEMPO2), PEDIDO4, table[4]);

  let last = await Promise.all([orden1, orden2, orden3, orden4]);
  return console.log(last[0] + "\n", last[1] + "\n", last[2] + "\n", last[3]);
}

async function consultaAPI() {
  const url = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`;

  const fetch = require("node-fetch");
  let pedido1 = await fetch(url).then(function(response) {
    return response.json();
  });
  let pedido2 = await fetch(url).then(function(response) {
    return response.json();
  });
  let pedido3 = await fetch(url).then(function(response) {
    return response.json();
  });
  let pedido4 = await fetch(url).then(function(response) {
    return response.json();
  });

  let last = await Promise.all([pedido1, pedido2, pedido3, pedido4]);
  return last;
}

waiter();
waiter2();
waiter3();
waiter4();
