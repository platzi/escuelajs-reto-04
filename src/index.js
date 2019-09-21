const fetch = require('node-fetch')

const ORDER_API_URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'


const randomTime = () => Math.ceil(Math.random() * 8000)


const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(product && time && table){
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }else{
        reject('La orde no tienen suficiente información.')
      }
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
  orders(randomTime(), menu.hamburger4, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();


const waiter2 = ()=> {
  orders(randomTime(),menu.hotdog,table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(),menu.pizza,table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

waiter2()

const waiter3 = async () => {
  const _table = table[1]
  const order1 = await orders(randomTime(),menu.hotdog,_table)
  
  const order2 = await orders(randomTime(),menu.pizza,_table)
  
  const order3 = await orders(randomTime(),menu.hotdog,_table)
  
  console.log(order2)
  console.log(order1)
  console.log(order3)
}

 waiter3().catch((err) => {
   console.log(err)
 })

const fetchOrder = async () => {
  const _menu =  await fetch(ORDER_API_URL)
  return _menu.json()
}



const waiter4 = async ()=>{
  
  const orders_list = []
  const order1 = await fetchOrder()
  const order2 = await fetchOrder()
  const order3 = await fetchOrder()
  const order4 = await fetchOrder()

  orders_list.push(orders(randomTime(),order1.data,table[4]))
  orders_list.push(orders(randomTime(),order2.data,table[4]))
  orders_list.push(orders(randomTime(),order4.data,table[4]))
  orders_list.push(orders(randomTime(),order3.data,table[4]))
  
  const orders_resolved = await Promise.all(orders_list)

  orders_resolved.forEach(item => console.log(item))
}

waiter4().catch(err => console.log(err));