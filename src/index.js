const randomTime = (min = 1000, max = 8000) =>
  Math.floor(Math.random() * (max - min) + min);

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time) {
      reject('No tenemos un tiempo definido para entregar el pedido.')
    }

    if (!product) {
      reject('No se puede servir el pedido. No nos han dicho qué van a pedir.')
    }

    if (!table) {
      reject('No se puede servir el pedido. No sabemos a que mesa llevarlo.')
    }

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

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
      .then((res) => {
        console.log(res)
        return orders(randomTime(), menu.pizza, table[2])
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
};

waiter2()

const waiter3 = async () => {
  try {
    const listOfOrdersToServe = [
      await orders(randomTime(), menu.hotdog, table[1]),
      await orders(randomTime(), menu.pizza, table[1]),
      await orders(randomTime(), menu.hotdog, table[1])
    ]
    const ordersToServe = await Promise.all(listOfOrdersToServe)

    console.log(ordersToServe)
  } catch (error) {
    console.error(error.message)
  }
};

waiter3()