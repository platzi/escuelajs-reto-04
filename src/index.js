const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (product == undefined){
      reject(`El pedido ${product} no existe`)
      
    } else{
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }  
  });
}

const fetchOrders = () => {
  fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders')
  .then(response => {response.json()
  console.log(response)})
}
fetchOrders()

const randomTime = () => (Math.floor(Math.random() * (8 - 1 + 1) + 1))*1000

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
  orders(randomTime(), menu.hotdog, table[2])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[0])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter3 = async () =>{
  const orden1 = await orders(randomTime(), menu.hotdog, table[1])
  const orden2 = await orders(randomTime(), menu.pizza, table[1])
  const orden3 = await orders(randomTime(), menu.hotdog, table[1])
  console.log(
  `${orden1}
  ${orden2}
  ${orden3}`)
}
// waiter();
// waiter2();
// waiter3();

