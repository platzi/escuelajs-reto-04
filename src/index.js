const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {                              // problema 1.  agregamos el condicional if para establecer que lo que esta allí incluido-
      setTimeout(() => {                     // depende lo establecido en la funcion orders.
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('Su orden no ha sido tomada');   // problema 1. agregamos el reject para completar la funcion orders
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

// problema 1. Al crear la funcion randonTime Retorna un entero aleatorio entre min y max
const randonTime = () => {
  return Math.floor(Math.random() * (8000 - 1000)) + 1000;
}

const waiter = () => {
  orders(randonTime(1000,8000), menu.hamburger, table[3])
    
    .then( res => {                               // probema 2. Se agrego el encadenamiento (promesa encadenada)
      console.log(res)
      return waiter2('pedido1')
    })
    .then( res => {
      console.log(res)
      return waiter2('pedido2')
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();


// problema 2. creamos la funcion waiter2 utilizando el metodo Switch con sus instancias 
//case para crear el encadenamiento
const waiter2 = (pedido) => {
  switch (pedido) {
    case "pedido1":
      return orders(randonTime(), menu.hotdog, table[0]);
    case "pedido2":
      return orders(randonTime(), menu.pizza, table[2]);
  }
}

waiter2();

// problema 3. creamos una funciona llamada waiter3, el cual se encarga de 
// recoger el pedido de la mesa 2

const waiter3 = async () => {
  try {
    orders(randonTime(), menu.hamburger, table[1]);
    orders(randonTime(), menu.hotdog, table[1]);
    orders(randonTime(), menu.pizza, table[1]);
    
  } catch(error) {
    console.log('No se puede entregar la orden, hay un error')
  }
}

waiter3();




