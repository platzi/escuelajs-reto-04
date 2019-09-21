const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time == null || product == null || table == null) {
      reject( new Error("Orden Incompleta, Falto parametro de tiempo o producto o mesa"))
    } else {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

function randomTime() {
  return (Math.floor(Math.random()  * (8000, 1000)))
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {console.log(`Waiter 2 ${res}`)})
  orders(randomTime(), menu.pizza, table[2])
    .then(res=> console.log(`Waiter 2 ${res}`))
    .catch((err) => console.error(err));
};

async function  waiter3()  {
  try {
    pedido1 = await orders(randomTime(), menu.hotdog, table[2])
    pedido2 = await orders(randomTime(), menu.pizza, table[82])
    pedido3 = await orders(randomTime(), menu.hotdog, table[2])
    console.log("waiter 3, Pedidos completados",pedido1,pedido2,pedido3)    
  } catch (error) {
    console.log(`Error para waiter 3 ${error} `)
  }
}

waiter();
waiter2();
waiter3();
