/**
 * @author Arantxa Giovanna Rosas del Valle
 * This js allow user to create waiters that takes orders to different tables in a restaurant. 
 * All the functions are asyncronous but the function that executes the others is sync in order to allow
 * user to see how every function works separately.
 * 
 * This program uses node-fetch that allow user to run the program in a node server. 
 * Before you run this program use npm i node-fetch
 * 
 * For further information please contact to @aryrosvall
 */

const fetch = require("node-fetch");
const API_URL = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";

/**
 * @function orders 
 * Function that asks the kitchen to make an order
 * 
 * @param {int} time
 * @param {string} product
 * @param {int} table
*  @param {int} waiterId
*  @param {int} diner
   @returns {Promise} Promise with the order served
 */
const orders = (time = 6000, product, table = 0, waiterId = 1,diner = 1) => {
  console.log(`Mesero ${waiterId}: "Comensal ${diner} de la ${table} ordenó ${product}. Su orden estará lista en ${time} ms"`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `\n ${time} ms más tarde... \n Mesero ${waiterId}: Estimado cliente ${diner} aquí está su ${product}. ¡Disfrute su platillo! \n`
      );
    }, time);
  });
};

/**
 * Menu: Object with the available menu options
 * @typedef {Object} 
 */
const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

/**
 * Table: Array that contains the number and name of the tables in the restaurant
 * @type {Array} 
 */
const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

/**
 * Returns a random int between 1000 and 8000
 * @function randomTime
 * @returns {int} 
 */
const randomTime = () => Math.floor(Math.random() * (8000 - 1000) + 1000);

/**
 * Returns a random option of the menu
 * @function randomTime
 * @returns {int} 
 */
const selectedMenu = () => {
  let selectedFood = Math.floor(Math.random() * 3);
  let menuArr = Object.keys(menu);
  return menuArr[selectedFood];
};

/**
 * Returns a promise with the order of the table 4
 * @function waiter
 * @returns {Promise} 
 */
const waiter = async () => {
  await orders(randomTime(), menu.hamburger, table[3])
  .then(res =>console.log(res))
  .catch(err => console.error(err));
};

/**
 * Returns a promise with the order of the tables 1 and 3
 * @function waiter2
 * @returns {Promise} 
 */
const waiter2 = async() => {
  await orders(randomTime(), menu.hamburger, table[0], 2)
  .then(res => console.log(res))
  .then(() => {
  return orders(randomTime(), menu.hamburger, table[2], 2);
  })
  .then(res => console.log(res))
  .catch(err => console.error(err));
};

/**
 * Returns a promise with the order four 3 people of the table 2
 * @function waiter3
 * @returns {Promise} 
 */
const waiter3 = async () => {
  try {
    let ordersArr = [];
    let ordersTotal = "";
    let res = "";

    ordersArr.push(orders(randomTime(), selectedMenu(), table[1], 3));
    ordersArr.push(orders(randomTime(), selectedMenu(), table[1], 3));
    ordersArr.push(orders(randomTime(), selectedMenu(), table[1], 3));

    ordersTotal = await Promise.all(ordersArr).then(res => res);
    ordersTotal.forEach(element => {
       res += element;
    });
    return res
  } catch (err) {
    console.error(err);
  }
};

/**
 * Generic function that allows user to ask with every waiter at least one order per table. 
 * It try to ask to an API for the menu. In case it can't connect to the API, it chooses an option of the array. 
 * @function fetchOrders
 * @param {int} waiterId 
 * @param {int} numberOfOrders 
 * @param {string} API_URL 
 * @param {int} tableNumber 
 * @returns {Promise} 
 */
const fetchOrders = async (waiterId= 0, numberOfOrders = 1, API_URL, tableNumber = 0) => {
  console.log(`Mesero ${waiterId}: Hola yo soy el mesero ${waiterId} y tendré el placer de atender su mesa número ${tableNumber}`)
  let orderTotal = "";
  let orderType = "";
  try {
    for (let i = 1; i <= numberOfOrders; i++) {
      console.log(`\nMesero ${waiterId}: Cliente ${i} ¿Qué desea ordenar?`);
      orderType = await fetch(API_URL)
      .then(res => res.json())
      .then(json => json.data)
      .catch(()=>{
        orderType = selectedMenu()
        console.log(`Mesero ${waiterId}: Lo siento la API no está disponible por el momento pero el menú de hoy es ${orderType}`)
        return orderType;
      });
      orderTotal += "\n";
      orderTotal += (await orders(randomTime(), orderType, table[tableNumber], waiterId, i));
    }
    return orderTotal
  } catch (err) {
      console.error("Something went wrong with the request", err);
  }  
};

/**
 * Generic function that allows user to create waiters that takes orders to an specific number of table. 
 * It uses fetchOrders function.
 * @function genericWaiter
 * @param {int} waiterId 
 * @param {int} diners 
 * @param {string} API_URL 
 * @param {int} tableNumber 
 * @returns {Promise}
 */
const genericWaiter = async (waiterId = 0, diners = 1, API_URL, tableNumber = 0) => {
  return orderReceived = await fetchOrders(waiterId, diners, API_URL, tableNumber)
};

(async () => {
  try {

    console.log(`====Orden Reto 1`)
    await waiter()

    console.log(`\n====Orden Reto 2`);
    await waiter2();

    console.log(`\n====Orden Reto 3`)
    console.log(await waiter3());

    console.log(`\n====Orden 1 Reto 4`)
    console.log( await genericWaiter(2,2, API_URL, 1))

    console.log(`\n====Orden 2 Reto 4`)
    console.log( await genericWaiter(1,3, API_URL, 2))

  } catch (error) {
    console.log();
  }
})();


