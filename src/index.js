function randomTime(min, max) {
  return randomTimer = Math.floor(Math.random() * (max - min) + min)
}
//randomTime(1000, 8000) //llamando la funcion de esta manera nos dara un rango de 1 a 8k

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

const waiter = () => {
  orders(randomTime(1000, 8000), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders (randomTime(1000, 8000), menu.hotdog, table[0])
  .then((res) => console.log(res))
  return orders (randomTime(1000, 8000), menu.pizza, table[2])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));    
}
  
waiter2();

const waiter3 = async () => {
  try {
    const allDishes = [
      orders(randomTime(1000, 8000), menu.hotdog, table[1]),
      orders(randomTime(1000, 8000), menu.pizza, table[1]),
      orders(randomTime(1000, 8000), menu.hotdog, table[1])
    ];
    const readyToWork = await Promise.all(allDishes);
      console.log(readyToWork[0])
      console.log(readyToWork[1])
      console.log(readyToWork[2])
    } catch (error) {
    console.log(`Es imposible entregar la orden por ahora, debido a ${error}`);
    }
};

waiter3();