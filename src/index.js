const randomTime = () => {
  return Math.floor((Math.random() * 7000) + 1000);
};

const orders = (time, product, table) => {
  return new Promise((resolve, reject) => {
    if (time && product && table) {
      console.log(`### Orden: ${product} para ${table}`);
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('Favor de brindar los datos necesarios para solicitar la orden')
    }
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
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  
  orders(randomTime(), menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

const waiter3 = async () => {
  try {
    const dish1 = await orders(randomTime(), menu.hotdog, table[1]);
    const dish2 = await orders(randomTime(), menu.pizza, table[1]);
    const dish3 = await orders(randomTime(), menu.hotdog, table[1]);
    console.log(`Se sirve en ${table[1]}:
      ${dish1}
      ${dish2}
      ${dish3}
    `);
  } catch (error) {
    console.log(`ERROR: ${error}`)
  } 
}

waiter();
waiter2();
waiter3();
