const axios = require('axios'); //import axios library to fetch request to API

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"]; // set the tables
const URL = "https://us-central1-escuelajs-api.cloudfunctions.net/orders"; // set the api url
const MIN = 1000 // set the min value to calculate the random ms
const MAX = 8000 // set the max value to calculate the random ms

const orders = (time, table, menuItem, waiter) => {  //the main function receive 4 arguments time in ms, table an array position, an menu item and a waiter
  console.log(`>>${waiter}<< Pedido: ${menuItem} En: ${table}`);
  return new Promise((resolve, reject) => {
    if (time && menuItem && table) { //validate the arguments
      setTimeout(() => {
        resolve( `${waiter} entrego ${menuItem},  en la  ${table} y tardo ${time}ms`); //resolve true with an string
      }, time);
    } else {
      reject(new Error("no se especificaron algunos argumentos")); //reject an error
    }
  });
};

const randomTime = (max, min) => Math.round(Math.random() * (max - min) + min) //the random function return a integer value

const menu = { //the array of menu
  hamburger: "Combo Hamburguesa",
  hotDog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const waiter2 = () => { //waiter 2 the secont issue
  orders(randomTime(MIN, MAX), table[0], menu.hotDog,  'Mesero 2')
  .then(res => {
    console.log(res);
  });
  orders(randomTime(MIN, MAX), table[2], menu.pizza,  'Mesero 2')
    .then(res => 
      console.log(res)
      )
    .catch(err => console.log(`El Mesero 2 no eta disponible: ${err}`));
  };

  
  
  const waiter3 = async () => { //waiter 3 the thirth issues
    try {
      const dishes = [
        orders(randomTime(MIN, MAX), table[1], menu.hotDog, 'Mesero 3'),
        orders(randomTime(MIN, MAX), table[1], menu.pizza, 'Mesero 3'),
        orders(randomTime(MIN, MAX), table[1], menu.hotDog, 'Mesero 3')
      ];
      const response = await Promise.all(dishes);
      console.log(response[0]);
      console.log(response[1]);
      console.log(response[2]);
    } catch (error) {
      console.log(`El Mesero 3 no puede entegar la orden debido a: ${error}`);
    }
  };
  
  const fetchOrders = async () => { //the fourth issue using axios
  return new Promise ( function (resolve, reject) {
    axios.get(URL).then(response =>{
        resolve(response.data.data)
    }).catch(error => {
        reject('Esta cerrada la cocina en este momento')
    });
})
};

const waiter4 = async () => {  //the fourth issue using promise.all to solve the all promises awaits
try {
  const arrayOrders = await Promise.all([
    fetchOrders(),
    fetchOrders(),
    fetchOrders(),
    fetchOrders()
  ]);

  const dishes = [
    orders(randomTime(MIN, MAX), table[4], arrayOrders[0], 'Mesero 4'),
    orders(randomTime(MIN, MAX), table[4], arrayOrders[1], 'Mesero 4'),
    orders(randomTime(MIN, MAX), table[4], arrayOrders[2], 'Mesero 4'),
    orders(randomTime(MIN, MAX), table[4], arrayOrders[3], 'Mesero 4')
  ];

  const serveDishes = await Promise.all(dishes);
  console.log(serveDishes[0]);
  console.log(serveDishes[1]);
  console.log(serveDishes[2]);
  console.log(serveDishes[3]);
} catch (error) {
  console.log(error);
}
};
// eject the function inthe order from the README,md
waiter2();
waiter3();
waiter4();