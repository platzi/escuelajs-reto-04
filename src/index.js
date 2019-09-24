const orders = (time, product, table) => {
  
  console.log(`### Orden: ${product} para la ${table}`);
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

//                0         1         2         3         4
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

function randomTime (){ 
  const min=1000; 
  const max=8000;  
  let time = Math.random() * (+max - +min) + +min; 
  return time.toFixed(0);
}

const waiter = (combo) => {
  orders(randomTime(), menu[combo], table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
// Pedido "Mesa 1": Combo Hotdog Pedido "Mesa 3": Combo Pizza

const waiter2 = (customerOrder1, customerOrder2) => {
      orders(randomTime(), menu[customerOrder1], table[1])
        .then(response => {
          console.log(response);
          return orders(randomTime(), menu[customerOrder2], table[1])
            .then(response =>{
              console.log(response);
            })
        })
}
    

// Pedido "Mesa 2": Combo Hotdog, Combo Pizza, Combo Hotdog

// Utiliza Async/Await

// Manejo de errores

// Utiliza la función de randomTime
const waiter3 = () => {
  ordersMesa2 = async () => {
    const combo1 = await orders(randomTime(),menu.hotdog, table[3]);
    const combo2 = await orders(randomTime(),menu.pizza, table[3]);
    const combo3 = await orders(randomTime(),menu.hotdog, table[3]);
    Promise.all([combo1,combo2,combo3])
    return combo1, combo2, combo3; 
  }

  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
 
return ordersMesa2;
  };
console.log('mesero default');  
waiter('hamburger');
console.log('mesero 2');
waiter2('hotdog','pizza');
// console.log('mesero 3');
// waiter3();
console.log('  ');
console.log('  ');