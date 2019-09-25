const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time} es para la ${table}`);
    }, time);
  });
}
function randomTime(){
  const minTime = 1000
  const maxTime = 8000
  return Math.round(Math.random() * (maxTime - minTime) + minTime )
}

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

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, [0])
   .then((res) => console.log(res))
   .catch((err) => console.log(err));
  orders(randomTime(), menu.pizza,[2])
   .then((res) => console.log(res))
   .catch((err) => console.log(err));
   return waiter3()
 }

const waiter3 = async () => {
 try{
  const order4 = await orders(randomTime(), menu.hotdog, table[1])
  const order3 = await orders(randomTime(), menu.pizza, table[1])
  const orders = await orders(randomTime(), menu.hotdog, table[1])
  console.log(order4)
 } 
 catch(err){
   console.error(err)
 }

}

waiter();