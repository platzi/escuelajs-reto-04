'use strict'
/**
 * Función que regresa un valor entre min y max
 */ 
const randomTime = function (min, max) {
  return Math.floor(Math.random() * (+max - +min) + +min)
}



const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  
  return new Promise((resolve, reject) => {
    if(product === undefined){
      reject("Lo sentimos el producto que solicita no está disponible")
    }else{
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
let min_prod_time = 100
let max_prod_time = 800


const waiter = () => {
  orders(randomTime(min_prod_time,max_prod_time), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(min_prod_time,max_prod_time), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      orders(randomTime(min_prod_time,max_prod_time), menu.pizza, table[2])
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));

    
};

waiter();
waiter2();
