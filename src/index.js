let randomTime = (min,max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(time > 0) {
      setTimeout(() => {
        resolve (`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }
    else {
      reject (`No se recibio ningun pedido`)
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
  orders(randomTime(1000,8000) , menu.hamburger, table[3])
    .then((resolve) => console.log(resolve))
    .catch((reject) => console.error(reject));
};

const waiter2 = () => {
  orders(randomTime(1000,8000) , menu.hotdog, table[0])
    .then((resolve) => {
      console.log(resolve);
    return orders(randomTime(1000,8000) , menu.pizza, table[2])
    .then((resolve) => console.log(resolve))
    .catch((reject) => console.error(reject));
    })
    .catch((reject) => console.error(reject));
    
}

const  waiter3 = async() => {
   const order1 = await orders(randomTime(1000,8000) , menu.hotdog, table[0])
   const  order2 = await orders(randomTime(1000,8000) , menu.pizza, table[2])
  console.log( `${order1} \n ${order2}`)
 
};


waiter();
waiter2();
waiter3();

