
const orders = (time, product, table) => {
    console.log(`*** Pedido ${table}:  ${product} ***`);
    return new Promise((resolve, reject) => {
      if(time<9000){
        setTimeout(() => {
        resolve(`===> Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }else{
      const error= new Error('Sobrepasaste mi paciencia')
      console.log(`Tu tiempo fue de: ${time}😞`);
      reject(error)
    }
    });
  }
  
  const menu = {
    hamburger: 'Combo Hamburguesa',
    hotdog: 'Combo Hot Dogs   ',
    pizza: 'Combo Pizza      ',
  };
  
  const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
  const randomTime = () => Math.floor(Math.random() * (8000 - 100+ 1) + 1000)
  
  const waiter2 = () => {
    orders(randomTime(), menu.hotdog, table[0])
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    orders(randomTime(), menu.pizza, table[2])
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  
  waiter2();
  