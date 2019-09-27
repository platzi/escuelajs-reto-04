const maxTime = 8000;
const minTime = 1000;

const randomTime = () => {
  var random = Math.floor(Math.random() * (maxTime - minTime) + minTime)
  return random;
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time && product && table) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject((error) => (`Existe un problema en el pedido: ${error}`))
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
    .then((response) => console.log(response))
    .catch((error) => console.log(`Hubo un problema con el Mesero 1: ${error}`));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((response) => {
      console.log(response)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(`Hubo un problema con el Mesero 2: ${error}`))
}

const waiter3 = async () => {
  let orderList = [
    orders(randomTime(), menu.hotdog, table[1]),
    orders(randomTime(), menu.pizza, table[1]),
    orders(randomTime(), menu.hamburger, table[1])
  ]
  const getOrderTable2 = await Promise.all(orderList);
  
  console.log(`========== Los Platos de la ${table[1]} estan listos: ==========`)
  getOrderTable2.forEach(order => console.log(order))
 
}

waiter();
waiter2();
waiter3();
