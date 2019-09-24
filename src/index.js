var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => {
  let segunds
  do {
    segunds = Math.random() * 10;
    segunds = Math.round(segunds);
    segunds = segunds*1000;
  } while (segunds < 1000 || segunds > 8000)

  return segunds
}

const orders = (product, table) => {
  time = randomTime()
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject(new Error(console.error(`***Pedido Fallido: Promesa Fallida***`)));      
    }

   
  });
}

const fetchOrders = (table)  => {  
  time = randomTime()
  return new Promise((results,reject) =>{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            product = JSON.parse(xhttp.responseText)
              console.log(`### Orden: ${product.data} para ${table}`);
              setTimeout(() => {
                results(`=== Pedido servido: ${product.data}, tiempo de preparación ${time}ms para la ${table}`);
              }, time);
          } else {
              reject(error(xhttp.statusText))
          };
      }
  };

  xhttp.open('GET', API, false);
  xhttp.send();

})}


const waiter = () => {
  orders(menu.hamburger, table[3])
    .then((resolve) => console.log(resolve))
    .catch((error) => console.error(error));
};

const waiter2 = () =>{
  orders(menu.hotdog, table[0])
  .then((order1) =>{
     orders(menu.pizza, table[2])
    .then((resolve) => {
      console.log(order1)
      console.log(resolve)
    })
    .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
}

async function waiter3(){
 let order1 =  await orders(menu.hotdog,table[1])
 let order2 = await orders(menu.pizza,table[1])
 let order3 =  await orders(menu.hotdog,table[1])

 console.log(order1)
 console.log(order2)
 console.log(order3)
}

async function waiter4() {
let order1 =  await fetchOrders(table[4])
let order2 =  await fetchOrders(table[4])
let order3 =  await fetchOrders(table[4])
let order4 =  await fetchOrders(table[4])

console.log(order1)
console.log(order2)
console.log(order3)
console.log(order4)

} 

waiter()
waiter2()
waiter3()
waiter4()