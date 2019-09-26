
const orders = (randomTime, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log(`=== Pedido servido: ${product}, tiempo de preparación ${randomTime}ms para la ${table}`));
      reject(`=== Pedido no preparado`);
    }, randomTime);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => {
  let time = Math.floor(Math.random() * (8000 - 1000) + 1000);
  return time
}

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        orders(randomTime(), menu.hotdog, table[0]).then((res) => {
          console.log('primer pedido entregado');
          orders(randomTime(), menu.pizza, table[2]).then((res) => {
            console.log('segundo pedido entregado')
          })
        })
      )
      reject('ningun pedido entregado comuniquese con mi superior')
    }, randomTime())
  })
}

const waiter3 = async () => {
  const plato1 = orders(randomTime(), menu.hotdog, table[1]);
  const plato2 = orders(randomTime(), menu.pizza, table[1]);
  const plato3 = orders(randomTime(), menu.hotdog, table[1]);
  try {
    const pedido = await Promise.all([plato1, plato2, plato3]);
    console.log(pedido)
  } catch (err) {
    console.log(err);
  }
}

const API = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`
const fetchOrders = async () => {
  return new Promise((resolve, reject) => {
    fetch(API)
      .then(resolve => resolve.json())
      .then(body => resolve(body.data))
      .catch(reject => reject(`orden no obtenida: ${reject}`))
  });
};

const waiter4 = async () => {

  let promesas = [];
  const entrega = []
  for (i = 0; i < 4; i++) {
    debugger;
    const response = await fetchOrders()
    if (response) {
      const pedidos = await response;
      entrega = orders(randomTime(), pedidos, table[4]);
      promesas.push(entrega);
    }
    else {
      console.log(`No se pudo completar el pedido de la mesa ${table[4]}`)
    }
  }
}
waiter();
waiter2();
waiter3();
waiter4();