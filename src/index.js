const MIN_VALUE = 1000
const MAX_VALUE = 8000
function randomTime() {
  return MIN_VALUE + Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1))
}

const orders = (oneOrderItem) => {
  console.log(`### Orden: ${oneOrderItem.product} para ${oneOrderItem.table}. por mesero ${oneOrderItem.waiter}. Tiempo estimado ${oneOrderItem.time}`);
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${oneOrderItem.product}, tiempo de preparación ${oneOrderItem.time}ms para la ${oneOrderItem.table} atendido por mesero ${oneOrderItem.waiter}`)
      }, oneOrderItem.time);
    }
  );
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

class OrderItem {
  constructor(time, product, table, waiter) {
    this.time = time;
    this.product = product;
    this.table = table;
    this.waiter = waiter;
  }
}

function onError(key) {
  console.log(`Algún error ocurrió con la orden del mesero ${key.waiter} de producto ${key.product}, para la mesa ${key.table}, tiempo estimado : ${key.time}`)
}
const table = ['', 'Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const timeArrayFirstOrders = [6000, randomTime(), randomTime()]
const productArrayFirstOrders = [menu.hamburger, menu.hotdog, menu.pizza]
const tableArrayFirstOrders = [table[3], table[1], table[3]]
const waitersFirstOrders = ['waiter1', 'waiter2', 'waiter2']

var orderskeysFirstOrders = new Array();
for (let i = 0; i < timeArrayFirstOrders.length; i++) {
  orderskeysFirstOrders.push(new OrderItem(timeArrayFirstOrders[i], productArrayFirstOrders[i], tableArrayFirstOrders[i], waitersFirstOrders[i]));
}

const waiter = () => {
  orders(new OrderItem(timeArrayFirstOrders[0], productArrayFirstOrders[0], tableArrayFirstOrders[0], waitersFirstOrders[0]))
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
waiter();

const waiter2 = () => {
  orders(new OrderItem(timeArrayFirstOrders[1], productArrayFirstOrders[1], tableArrayFirstOrders[1], waitersFirstOrders[1])) 
  .then( theOrder1 => {
    console.log(theOrder1)
    return orders(new OrderItem(timeArrayFirstOrders[2], productArrayFirstOrders[2], tableArrayFirstOrders[2], waitersFirstOrders[2]))
  })
  .then( theOrder2 => {
    console.log(theOrder2)
  })
  .catch(onError)
};
waiter2();

async function waiter3(keys) {
  let promises = keys.map(key => orders(key))
  try {
    let theOrders = await Promise.all(promises)
    for (let i = 0; i < theOrders.length; i++) {
       console.log(theOrders[i])
    }
  } catch (key) {
    onError(key)
  }
}

const timeArrayWaiter3 = [randomTime(), randomTime(), randomTime()]
const productArrayWaiter3 = [menu.hotdog, menu.pizza, menu.hotdog]
let orderskeys = new Array();
for (let i = 0; i < timeArrayWaiter3.length; i++) {
  orderskeys.push(new OrderItem(timeArrayWaiter3[i], productArrayWaiter3[i], table[2], 'waiter3'));
}
waiter3(orderskeys)
