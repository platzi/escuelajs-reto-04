function randomTime() {
  var min = 1000, max = 8000;
  var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 5 - 10
  return rand
  //setTimeout(randomTime, rand * 1000);
}
randomTime()


const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

function error() {
  console.log('Sucedio un error!!!')
}


const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};


/*

Segundo Problema
Crea una función llamada "waiter2" que se encargue de recoger dos pedidos, 
uno de la "Mesa 1" y otro de la "Mesa 3".

Pedido 
  "Mesa 1": Combo Hotdog Pedido 
  "Mesa 3": Combo Pizza

Utiliza Promesas Encadenadas
Utiliza la función de randomTime

*/

const waiter2 = () => {
      orders(randomTime(), menu.hotdog, table[0])
      .then((res) => console.log(res))
      .then(() => {
        orders(randomTime(), menu.pizza, table[2])
        .then((res) => console.log(res))
        .catch((err) => console.error(err)) 
      })
      .catch((err) => console.error(err))       
}

//waiter2()

/*

Tercer Problema
Crea una función llamada "waiter3" que se encargue de recoger el pedido de la "Mesa 2" 
el pedido solo puede ser entregado hasta que todos los plantillos estén 
listos para ser servidos.

Pedido "Mesa 2": Combo Hotdog, Combo Pizza, Combo Hotdog

Utiliza Async/Await
Manejo de errores
Utiliza la función de randomTime

*/

async function waiter3() {
  try {
    const orden1 = await orders(randomTime(), menu.hotdog, table[0]);
    console.log(orden1)
    const orden2 = await orders(randomTime(), menu.hotdog, table[1]);
    console.log(orden2)
    const orden3 = await orders(randomTime(), menu.pizza, table[1]);
    console.log(orden3)
    const orden4 = await orders(randomTime(), menu.hotdog, table[1]);
    console.log(orden4)
    const orden5 = await orders(randomTime(), menu.pizza, table[2]);
    console.log(orden5)    
  }
  catch(e) {
    console.log(`Error: ${e}`)
  }

  return;
}

waiter3();

/*

Cuarto Problema (Opcional)
Crea una función llamada "fetchOrders" que realice un llamado a la API de ordenes y una función llamada "waiter4" que se encargue de solicitar 4 pedidos que deban de ser entregados hasta que estén todos listos.

API: https://us-central1-escuelajs-api.cloudfunctions.net/orders
Utiliza Async/Await
Manejo de errores

*/


async function fetchOrders() {  
  try {
    const response = await fetch("https://us-central1-escuelajs-api.cloudfunctions.net/orders");
    console.log(response.json())
  }catch(e) {
    console.log(`Falla: ${e}`)
  }
}

fetchOrders();

/*

Aún tengo dudas de consumir una API sin jquery.

*/