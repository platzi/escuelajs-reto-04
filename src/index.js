const TIME_MAX = 8000;
const TIME_MIN = 1000;

const randomTime = () => {
  return Math.floor(Math.random() * (TIME_MAX - TIME_MIN) + TIME_MIN);
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time || !product || !table) {
      reject(`La orden no se puede completar debido a que no contamos con los datos necesarios`)
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

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((response) => {
      console.log(response)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then(response => console.log(response))
    .catch((err) => console.error(err));
}

const waiter3 = async () => {
  const orderPromises = [];
  orderPromises.push(orders(randomTime(), menu.hotdog, table[1]));
  orderPromises.push(orders(randomTime(), menu.pizza, table[1]));
  orderPromises.push(orders(randomTime(), menu.hotdog, table[1]));

  try {
    var response = await Promise.all(orderPromises);
    console.log(response);    
  } catch (error) {
    console.log(error);
  }

}

waiter();
waiter2();
waiter3();