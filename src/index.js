
let randomTime= (min,max)=>{
    min= 1;
    max= 8;
   let time = Math.floor(Math.random() * ((max+1) - min) + min);
   return time*1000

  }

  // const Time = randomTime()

  const orders = (Time, product, table) => {
    console.log(`### Orden: ${product} para ${table}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${Time}ms para la ${table}`);
      }, Time);
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
    .then((res) => {console.log(res); return orders(randomTime(),menu.pizza,table[2])})
    .then((res)=> console.log(res))
    .catch((err) => console.error(err));
};


const waiter3 = async() => {
  const pedido1 = await orders(randomTime(), menu.hotdog, table[2])
  const pedido2 = await orders(randomTime(), menu.pizza, table[2])
 

  console.log(pedido1)
  console.log(pedido2)

  
};
waiter();
waiter2()
waiter3()

