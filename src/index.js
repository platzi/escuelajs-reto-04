const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (false) {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);  
      } else {
        reject(`!== Pedido falló: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }
      
    }, time);
  });
}
const randomTime = () =>{
  return  Math.floor(Math.random() * (8000 - 1000) + 1000);
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

waiter();
