const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (product == undefined){
      reject(`El pedido ${product} no existe`)
      
    } else{
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }  
  });
}

const randomTime = () => (Math.floor(Math.random() * (8 - 1 + 1) + 1))*1000

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
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  const order1 = orders(randomTime(),menu.hotdog,table[1]);
  const order2 = orders(randomTime(),menu.pizza,table[1]);
  const order3 = orders(randomTime(),menu.hotdog,table[1]);
  try { 
    const pedidos = await Promise.all([order1, order2, order3]);
    console.log(pedidos.toString())
  } catch(err){
    console.log(err);
  }
}
const fetch = require("node-fetch");
const fetchOrders = () => {
  const response = fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders')
  return response
}
const waiter4 = async () => {
  for (i=0; i<4; i++){
    const response = await fetchOrders()
    if(response.ok){
      const pedidos = await response.json()
      const entrega = await orders(randomTime(),pedidos.data,table[4])
      console.log(entrega)
    }
    else{
      console.log(`No se pudo completar el pedido de la mesa ${table[4]}`)
    }
  } 
}

waiter();
waiter2();
waiter3();
waiter4()


