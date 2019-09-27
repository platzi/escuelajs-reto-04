const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
      if(!time)return reject(new Error('Ha ocurrido un error con el tiempo de tú pedido'))
      if(!product)return reject(new Error('Ha ocurrido un error con el platillo de tú pedido'))
      if(!table)return reject(new Error('El mesero no sabe de que mesa es el pedido'))
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);    
  });
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => {
  const max = 8000
  const min = 1000
  return Math.floor(Math.random() * (max - min + 1)) + min 
};

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((error) => console.error(error));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(`Waiter 2 ${res}`)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then(res => console.log(`Waiter 2, mesa 2 ${res}`))
    .catch(error => console.log(error))
};

const waiter3 =  async order => {
  try {
    let pedido1 = await order(randomTime(), menu.hotdog, table[1])
    let pedido2 = await order(randomTime(), menu.pizza, table[1])
    let pedido3 = await order(randomTime(), menu.hotdog, table[1])
    console.log(`Waiter3 ==>> ${pedido1}`)
    console.log(`Waiter3 ==>> ${pedido2}`)
    console.log(`Waiter3 ==>> ${pedido3}`)
  } catch(error){
    console.log(eror)
  }

};

waiter();
waiter2()
waiter3(orders)
