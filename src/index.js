

/** Challenge 1: Generate random number as ms between 1000 to 8000 */
const randomTime = () => {
 return Math.ceil(Math.random() * 8) * 1000
}


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
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

/** Challenge 2: Waiter 2 deliver to Table 1 and Table 3 */
const waiter2 = () => {  
  orders(randomTime(), menu.hotdog, table[0])
  .then(response => {
    console.log(response)
    return orders(randomTime(), menu.pizza, table[2])
  })
  .then(response => console.log(response))
  .catch(error => console.error(error));
}

/** Challenge 3: Waiter 3 deliver to Table 2 */
async function waiter3() {
  let order_table2 = [
    orders(randomTime(), menu.hotdog, table[1]),
    orders(randomTime(), menu.pizza, table[1]),
    orders(randomTime(), menu.hotdog, table[1])
  ]
  try{
    let response = await Promise.all(order_table2)
    console.log(response)
  } catch(error){
    console.log(error)
  }
}


/** main program */
waiter()
waiter2()
waiter3()
