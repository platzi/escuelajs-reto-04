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

const waiter = () => {
  orders(randomTime(100,800), menu.hamburgers, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

/* function findProduct(product,menu_arr){
  let products = Object.keys(menu)

  console.log(products)
}

findProduct(menu) */