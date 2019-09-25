const fetch = require("node-fetch")
const orders = (waiter, time, product, table) => {
  
  console.log(`### Orden tomada por waiter${waiter}: ${product} para la ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
        reject(`== Paila, el mesero se comió su orden ==`);
      }, time);
      
    });
  }
  
const fetchOrders = async (waiter, table) => {    
    const API_URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
    return new Promise((resolve, reject) =>{ 
      const data = fetch(API_URL);
      console.log('===============================');
      console.log(data);
      console.log('===============================');
      const product = data.json;
      resolve(`### Orden tomada por waiter${waiter}: ${product.data} para la ${table}`
      );
      reject(`== Paila, el mesero se comió su orden ==`);
});
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

//                0         1         2         3         4
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

function randomTime (){ 
  const min=1000; 
  const max=8000;  
  let time = Math.random() * (+max - +min) + +min; 
  return time.toFixed(0);
}

const waiter = (combo) => {
  orders('',randomTime(), menu[combo], table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
// Pedido "Mesa 1": Combo Hotdog Pedido "Mesa 3": Combo Pizza

const waiter2 = (customerOrder1, customerOrder2) => {
      orders('2',randomTime(), menu[customerOrder1], table[0])
        .then(response => {
          console.log(response);
          return orders('2',randomTime(), menu[customerOrder2], table[2])
            .then(response =>{
              console.log(response);
            })
        })
}
    

// Pedido "Mesa 2": Combo Hotdog, Combo Pizza, Combo Hotdog

// Utiliza Async/Await

// Manejo de errores

// Utiliza la función de randomTime
const waiter3 = async(customer1,customer2,customer3) => {
  
    try {
      const customerOrder1 = await orders('3',randomTime(),customer1,table[1]);
      const customerOrder2 = await orders('3',randomTime(),customer2,table[1]);
      const customerOrder3 = await orders('3',randomTime(),customer3,table[1]);
      console.log(customerOrder1);
      console.log(customerOrder2);
      console.log(customerOrder3);      
    } catch (error) {
      console.log(`Lo sentimos, el mesero se comió su orden`)
    }  
  }

const waiter4 = async()=>{
  order = await fetchOrders(4,table[1]);
  console.log(order);
  
      
}


waiter('hamburger');

waiter2('hotdog','pizza');

waiter3('hotdog','pizza','hotdog');

waiter4();
