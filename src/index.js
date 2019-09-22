const maxTime = 8000;
const minTime = 1000;


const randomTime = () => (Math.floor(Math.random()* (maxTime - minTime) + minTime));

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    if(!time || !product || !table){
      reject(new Error(' La orden no ha podido ser creada por que no fue recibido un requerimento '));
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
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
async function waiter3(){
  let order = [ menu.hotdog, menu.pizza, menu.hotdog];
  let promises = order.map(menus => orders(randomTime(), menus, table[1]))
  try{
    let askOrders = await Promise.all(promises);
    console.log(askOrders);
  }catch(menus){
    console.error(menus)
  } 
};

waiter();
waiter2();
waiter3();
