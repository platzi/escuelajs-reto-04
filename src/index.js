const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time !== null) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);

    } else {
      reject("el tiempo no existe 😲")
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
const ramdonTime = (max = 8000, min = 1000) => Math.floor(Math.random() * (max - min) + min);

const waiter = () => {
  orders(ramdonTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(ramdonTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res)
      return orders(ramdonTime(), menu.pizza, table[2])
    })
    .then(res => {
      console.log(res)
    })
}

const waiter3 = async () => {
  try {
    const pedido1 = await orders(ramdonTime(), menu.hotdog, table[1])
    const pedido2 = await orders(ramdonTime(), menu.pizza, table[1])
    const pedido3 = await orders(ramdonTime(), menu.hotdog, table[1])

    console.log(pedido1)
    console.log(pedido2);
    console.log(pedido3);

  } catch (error) {
    console.log(`No pudimos entregar tu pedido porque ${error}`);
  }
}

waiter();
waiter2();
waiter3();