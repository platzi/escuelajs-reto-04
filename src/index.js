const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time != null && product != null && table != null) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject(`ALgun valor esta vacio`)
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

//waiter2
const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
    }).then(res => console.log(res))
    .catch((err) => console.error(err));
}

async function obtenerOrdenesMesa3() {

  const orderCustomer1 = await orders(randomTime(), menu.hotdog, table[1])
  const orderCustomer2 = await orders(randomTime(), menu.pizza, table[1])
  const orderCustomer3 = await orders(randomTime(), menu.hotdog, table[1])

  return Promise.all([orderCustomer1, orderCustomer2, orderCustomer3])
}
async function waiter3() {
  const ordenes = await obtenerOrdenesMesa3()
  ordenes.forEach(order => {
    console.log(order)
  });
}
//Problema 1
const randomTime = () => {
  let min = 1000
  let max = 8000
  return Math.floor(Math.random() * (max - min)) + min
}

waiter();
waiter2();
waiter3();