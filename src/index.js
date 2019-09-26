var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

/** Challenge 4 */
  const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
  let xhttp = new XMLHttpRequest();
  const fetchOrders = url_api =>{
    return new Promise( (resolve, reject) => {
      xhttp.onreadystatechange = (event) => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          return resolve(JSON.parse(xhttp.responseText))
        }
        else {
          return reject (`Error when execute: ${url_api}`)
        }
      }
      xhttp.open('GET', url_api, false)
      xhttp.send();
    })
  }

  async function waiter4() {
    const orders_table5 = []
    fetchOrders(API)
    .then (data1 => {
      orders_table5.push(data1.data)
      return fetchOrders(API)
    })
    .then (data2 => {
      orders_table5.push(data2.data)
      return fetchOrders(API)
    })
    .then (data3 => {
      orders_table5.push(data3.data)
      return fetchOrders(API)
    })
    .then (data4 => {
      orders_table5.push(data4.data)
    })
    .catch(error => console.log(error))
    let promises_orders = []
    for(let i; i < orders_table5.length(); i++){
      promises_orders.push(orders(randomTime(), orders_table5[i], table[4]))
    }
    try{
      let response = await Promise.all(promises_orders)
      console.log(response)
    } catch(error){
      console.log(error)
    }
  }

/** main program */
waiter()
waiter2()
waiter3()
waiter4()
