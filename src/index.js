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
  const orderCustomer1 = orders(randomTime(), menu.pizza, table[1])
  const orderCustomer2 = orders(randomTime(), menu.hamburger, table[1])
  const orderCustomer3 = orders(randomTime(), menu.hotdog, table[1])

  const processOrders = await Promise.all([orderCustomer1, orderCustomer2, orderCustomer3])
  processOrders.forEach((orders) => {
    console.log(orders);
  })
};




waiter();
waiter2();
waiter3();
