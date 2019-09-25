const randomTime = () => {
  let min = 1000;
  let max = 8000;
  return Math.floor(Math.random() * (max - min)) + min;
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const controlErrors = (time, product, table) => {
  let response = true;
  (!time) ? response = false : response = response;
  (!product) ? response = false : response = response;
  (!table) ? response = false : response = response;
  return response;
}

const orders = (time, product, table) => {
  return new Promise((resolve, reject) => {
    if (controlErrors(time, product, table)) {
      console.log(`### Orden: ${product} para ${table}`);
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject(new Error ('Hola, tienes un error hay campos vacios'))
    }
  });
}

const fetchOrders = async () => {
  const fetch = require("node-fetch")
  const URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'  
  const response = await fetch(URL)
  const pedido = await response.json()
  return pedido.data
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(pedido1 => {
      console.log(pedido1)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then(pedido2 => console.log(pedido2))
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  const platos = [menu.hotdog, menu.pizza, menu.hotdog]
  const promesas = platos.map(id => orders(randomTime(), id, table[1]))
  try {
    const ordenes = await Promise.all(promesas)
    console.log(ordenes);
  } catch (error) {
    console.error(error)
  }
}

const pedidoClientes = async () => {
  const CANTIDADPEDIDOS = 4
  const promesas = []

  for (let i = 0; i < CANTIDADPEDIDOS; i++) {
    promesas.push(fetchOrders())
  }

  const pedidos = await Promise.all(promesas)
  return pedidos
}

const waiter4 = async () => {
  const platos = await pedidoClientes()
  const promesas = platos.map(id => orders(randomTime(), id, table[1]))
  const pedidos = await Promise.all(promesas)
  console.log(pedidos)
}

// waiter();
// waiter2();
// waiter3();
waiter4();
