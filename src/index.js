'use strict'

const fetch = require('node-fetch');

/**
 * Función que regresa un valor entre min y max
 */ 
const randomTime = function (min, max) {
  return Math.floor(Math.random() * (+max - +min) + +min)
}



const orders = (time, product, table, waiter_name) => {
  console.log(`### Orden: ${product} para ${table} \n`);
  
  return new Promise((resolve, reject) => {
    if(product === undefined){
      reject("Lo sentimos el producto que solicita no está disponible")
    }else{
      setTimeout(() => {
        resolve(`${waiter_name}: === Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}  \n\n`);
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
let min_prod_time = 1000
let max_prod_time = 8000


const waiter = () => {
  console.log("Waiter 1...")
  orders(randomTime(min_prod_time,max_prod_time), menu.hamburger, table[3], "waiter 1")
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  console.log("Waiter 2...")
  orders(randomTime(min_prod_time,max_prod_time), menu.hotdog, table[0], "waiter 2")
    .then((res) => {
      console.log(res)
      return orders(randomTime(min_prod_time,max_prod_time), menu.pizza, table[2],  "waiter 3")      
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

    
};

const waiter3 = async () => {
  console.log("Waiter 3...")
  const orden1 = await orders(randomTime(min_prod_time,max_prod_time), menu.hotdog, table[1], "Waiter 3")
  const orden2 = await orders(randomTime(min_prod_time,max_prod_time), menu.pizza, table[1], "Waiter 3")
  const orden3 = await orders(randomTime(min_prod_time,max_prod_time), menu.hotdog, table[1], "Waiter 3")
  console.log(`Las 3 órdenes están listas: 
  ${orden1},  
  ${orden2}, 
  ${orden3}`)
  console.log(" ")

};


const waiter4 = async () => {
  console.log("Waiter 4: Resolviendo Pedido Especial ....")
  async function hacer_4_pedidos(waiter_name, mesa, menu_ext){
    const orden1 = await orders(randomTime(min_prod_time,max_prod_time), menu_ext.data, mesa, waiter_name)
    const orden2 = await orders(randomTime(min_prod_time,max_prod_time), menu_ext.data, mesa, waiter_name)
    const orden3 = await orders(randomTime(min_prod_time,max_prod_time), menu_ext.data, mesa, waiter_name)
    const orden4 = await orders(randomTime(min_prod_time,max_prod_time), menu_ext.data, mesa, waiter_name)
    console.log(` La orden especial está lista: 
    ${orden1}
    ${orden2}
    ${orden3}
    ${orden4}`)
  }
  const menu_externo_url = "https://us-central1-escuelajs-api.cloudfunctions.net/orders"
  fetch(menu_externo_url)
  .then(
    (data) => {
      return data.text()
    }
  )
  .then(body => {   
      let menu_externo = JSON.parse(body)
      hacer_4_pedidos("Waiter4",table[0], menu_externo)
     return menu_externo

  })
  .catch((err) => {
    console.log(err)
  })
  
}

//Pedido "Mesa 2": Combo Hotdog, Combo Pizza, Combo Hotdog
waiter();
waiter2();
waiter3();

waiter4();
