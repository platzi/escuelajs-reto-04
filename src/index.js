const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time} ms para la ${table}`);
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
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

// Reto 1
function randomTime() {
  let min = 1000
  let max = 8000
  return Math.floor((Math.random() * max) + min);
}


// Reto 2
const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
  .then((res)=> {
      console.log(res)
      
      orders(randomTime(), menu.pizza, table[2])
      .then((res)=> console.log(res))
      .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))
}

waiter2();

//reto 3
waiter3 = async () => {
  try {
    let pedidos = await Promise.all([
      orders(randomTime(), menu.hotdog, table[1]),
      orders(randomTime(), menu.pizza, table[1]),
      orders(randomTime(), menu.hotdog, table[1]),
    ]);
    for (i = 0; i < pedidos.length; i++){
      console.log(pedidos[i]) 
    } 
  } catch (err) {
    console.error(err);
  }
}

waiter3()

//reto 4

// waiter4 = async () => {
//   fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(JSON.stringify(myJson));
//   });
// }

// waiter4();