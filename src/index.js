const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!table){
      reject(`Error en el pedido, no hay mesa`)
    }
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}


const randomTime = (min, max) =>{
  return Math.floor(Math.random() * (max - min)) + min;
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(1000, 8000), menu.hamburger, table[4])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(1000, 8000), menu.hotdog, table[0])
    .then((res) => {
      console.log(res);
      orders(randomTime(1000, 8000), menu.pizza, table[2])
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const waiter3 = () => {
  
};

waiter();
waiter2();