const randomTime = () => {
  return Math.random() * 7000 + 1000;
};

const orders = (time, product, table, waiter) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}, por waiter: ${waiter}`
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

const waiter = () => {
  let waiterName = "waiter";
  orders(6000, menu.hamburger, table[3], waiterName)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = mesa => {
  let waiterName = "waiter2";
  if (mesa < 2) {
    mesa = 2;
  } else if (mesa > 3) {
    mesa = 3;
  }
  orders(randomTime(), menu.hamburger, table[mesa - 1], waiterName)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter3 = async () => {
  let waiterName = "waiter3";
  try {
    response = await orders(randomTime(), menu.hamburger, table[3], waiterName);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

let fetchOrders = (tables, waiterName) => {
  let promisesFetchOrder = [];
  tables.map(numberTable => {
    let promise = orders(
      randomTime(),
      menu.hamburger,
      table[numberTable],
      waiterName
    );
    promisesFetchOrder.push(promise);
  });
  return Promise.all(promisesFetchOrder);
};

let waiter4 = tablesFetchOrder => {
  fetchOrders(tablesFetchOrder, "waiter4").then(responses => {
    console.log("Una sola entrega:");
    console.log(responses);
  });
};

waiter();
waiter();
waiter();
waiter2(2);
waiter2(3);
waiter2(3);
waiter3();
waiter3();
waiter3();
waiter2(2);
waiter3();
waiter4([1, 2, 3, 4]);
