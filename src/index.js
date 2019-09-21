const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
      if (!product) 
        reject("no hay producto")
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
  });
}

const MAX = 1000
const MIN = 8000
const randomTime = () => Math.floor(Math.random() * (MAX - MIN + 1) + MIN); 

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res) 
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}

waiter2()

const waiter3 = async function (){
  try{
    const ordenes = [
      orders(randomTime(), menu.hotdog, table[1]),
      orders(randomTime(), menu.pizza, table[1]),
      orders(randomTime(), menu.hotdog, table[1])
    ]
    const res = await Promise.all(ordenes)
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}

waiter3()