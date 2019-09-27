const TIEMPO1 = 1000;
const TIEMPO2 = 8000;

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
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

// waiter();

// const waiter2 = () => {
//   const tiempo = numAleatorio(TIEMPO1, TIEMPO2);
//   orders(tiempo, menu.hamburger, table[0])
//     .then(res => console.log(res))
//     .then(
//       orders(tiempo, menu.hamburger, table[2]).then(res => console.log(res))
//     )
//     .catch(err => console.error(err));
// };

const waiter2 = () => {
  const tiempo = numAleatorio(TIEMPO1, TIEMPO2);
  orders(tiempo, menu.hamburger, table[0]).then(function(res1) {
    console.log(res1);
    orders(tiempo, menu.hamburger, table[2]).then(function(res2) {
      console.log(res2);
    });
  });
};

//waiter2();

// const waiter3 = () => {
//   const tiempo = numAleatorio(TIEMPO1, TIEMPO2);
//   orders(tiempo, menu.hamburger, table[0])
//     .then(res => console.log(res))
//     .then(
//       orders(tiempo, menu.hamburger, table[1]))
//     )
//     .then(
//       orders(tiempo, menu.hamburger, table[1]).then(res => console.log(res))
//     )
//     .catch(err => console.error(err));
// };

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

  return console.log(
    `Servi pedidio mesa2 ${response1} + \n, rServi pedidio mesa ${response2} + "\n",Servi pedido mesa3 ${response3}`
  );
  // let last = await Promise.all([response1, response2, response3]);
  // return console.log(last[0] + "\n", last[1] + "\n", last[2]);
}

waiter3();
