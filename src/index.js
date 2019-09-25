const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    });
}
function randomTime (){
  const min = 1000;
  const max = 8000;
  var numberRandom =(Math.random()*(max-min)+ min).toFixed(0)
  return numberRandom  ;
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((resolve) => console.log(resolve))
    .catch((reject) => console.error(reject));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((resolve) => console.log(resolve))

  orders(randomTime(), menu.pizza, table[2])
    .then((resolve) => console.log(resolve))
    .catch((reject) => console.error(reject))
};

const waiter3 =  async () =>{
  var orders1 =[
    orders(randomTime(), menu.hotdog, table[1]),
    orders(randomTime(), menu.pizza, table[1]),
    orders(randomTime(), menu.hamburger, table[1])
  ]
  try{
    var order3 = await Promise.all(orders1)
    .then((resolve) => console.log('El pedido para la mesa 2 es:',resolve))
  }catch (error){
    console.log('tenemos un error en el pedido')
  } 
}






waiter();
waiter2();
waiter3();

