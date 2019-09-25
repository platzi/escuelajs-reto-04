const MIN_VALUE = 1000
const MAX_VALUE = 8000
function randomTime() {
  return MIN_VALUE + Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1))
}

const orders = (oneOrderItem) => {
  console.log(`### Orden: ${oneOrderItem.product} para ${oneOrderItem.table}. por mesero ${oneOrderItem.waiter}. Tiempo estimado ${oneOrderItem.time}`);
  return new Promise((resolve, reject) => {
    if (time <= 0) {
      reject(oneOrderItem)
    } else {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table} atendido por mesero ${waiter}`);
      }, time);
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['', 'Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

//waiter();

function onError(key) {
  console.log(`Algún error ocurriócon la orden del mesero ${key.waiter} de producto ${key.product}, para la mesa ${key.table}, tiempo estimado : ${key.time}`)
}

class OrderItem {
  constructor(time, product, table, waiter) {
    this.time = time;
    this.product = product;
    this.table = table;
    this.waiter = waiter;
  }
}

//Reserved word async to use await
async function processOrders() {
  const timeArray = [6000, randomTime(), randomTime(), randomTime(), randomTime(), randomTime()]
  const productArray = [menu.hamburger, menu.hotdog, menu.pizza, menu.hotdog, menu.pizza, menu.hotdog]
  const tableArray = [table[3], table[1], table[3], table[2], table[2], table[2]]
  const waiters = ['waiter1', 'waiter2', 'waiter2', 'waiter3', 'waiter3', 'waiter3']
  let keys = new Array();
  for (let i = 0; i < timeArray.length; i++) {
    keys.push(new OrderItem(timeArray[i], productArray[i], tableArray[i], waiters[i]));
  }
  let promises = keys.map(key => orders(key))
  try {
    //await forces to fullfill all promises before continue
    //await must be inside a try catch block
    let theOrders = await Promise.all(promises)
    console.log(theOrders)
    for (let i = 0; i < theOrders.length; i++) {
      console.log(theOrders[i])
    }
  } catch (key) {
    onError(key)
  }
}

processOrders()