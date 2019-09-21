const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    reject(`Algo salio maal :(`)

    }, time);
  });
}

const randomTime = () => {
  return Math.floor((Math.random() * 8000) + 1000)
} 

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
  
    .then((res) => {console.log(res); })
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.pizza, table[2])
  .then((res) => {console.log(res); return orders(randomTime(), menu.hotdog, table[0])})
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
};

waiter();
waiter2();
const waiter3 = async () => {
  try {
  const replyHotDog = await orders(randomTime(), menu.hotdog, table[1]);
  const replyPizza = await orders(randomTime(), menu.pizza, table[1]);
  const resplyHotdog = await orders(randomTime(), menu.hotdog, table[1]);
  console.log(replyHotDog);
  console.log(replyPizza);
  console.log(resplyHotdog);
  }
  catch(error) {
    console.error(error);
  }
};

waiter3();









