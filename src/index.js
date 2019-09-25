const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms es para la ${table}`);
    }, time);
  });
}
function randomTime(){
  const minTime = 1000
  const maxTime = 8000
  let result = Math.round(Math.random() * 10000)
  result = Math.max(minTime, result)
  result = Math.min(maxTime, result)
  return result
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
  return orders(randomTime(), menu.hotdog, table[0])
   .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
   })
   .then((res) => {
    console.log(res)
  })
 }

const waiter3 = async () => {
  try{
    const productsTable = [menu.hotdog, menu.pizza, menu.hotdog] 
    const promises = productsTable.map((product) => orders(randomTime(), product, table[1]))
    const resultOrders = await Promise.all(promises)
    console.log(resultOrders)
  } 
  catch(err){
    console.error(err)
  }
 }
 
waiter();
waiter2();
waiter3();