const fetch = require('node-fetch');

const TIME_MIN = 1000;
const TIME_MAX = 8000;

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const tables = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = (min, max) => {
  const number = Math.floor((Math.random() * (max - min)) + min);
  return number;
}

const validateErrorTime = ({ time, product, table }) => {
  let response = false;
  if (time) {
    if (time < 1000 || time > 8000) {
      response = `Mesa: ${table}, Producto: ${product} => El tiempo ${time} no esta en nuestra promesa de entrega`;
    }
  } else {
    response = `Mesa: ${table}, Producto: ${product} => El tiempo de orden no esta definido`;
  }

  return response;
}

const validateErrorProduct = ({ product, table }) => {
  let response = false;

  if (product) {
    if (!Object.keys(menu).find(key => menu[key] === product)) {
      response = `Mesa: ${table} => El producto ${product} no esta en nuestro menu`;
    }
  } else {
    response = `Mesa: ${table} => El producto no esta definido`;
  }

  return response;
}

const validateErrorTable = ({ table }) => {
  let response = false;

  if (table) {
    if (!tables.find(item => item === table)) {
      response = `En nuestro restaurante  no tenemos la mesa: ${table}`;
    }
  } else {
    response = 'La Mesa no esta definido';
  }

  return response;
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let messageError = "";
      const order = {
        time: time,
        product: product,
        table: table
      };

      const responseValidateTable = validateErrorTable(order);
      if (!responseValidateTable) {
        const responseValidateProduct = validateErrorProduct(order);

        if (!responseValidateProduct) {
          const responseValidateTime = validateErrorTime(order);

          if (!responseValidateTime) {
            resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
          } else {
            messageError = responseValidateTime;
          }
        } else {
          messageError = responseValidateProduct;
        }
      } else {
        messageError = responseValidateTable;
      }

      reject(messageError);
    }, time);
  });
};

const waiter = () => {
  orders(randomTime(TIME_MIN, TIME_MAX), menu.hamburger, tables[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {

  orders(randomTime(TIME_MIN, TIME_MAX), menu.hotdog, tables[0])
    .then((res) => {
      console.log(res);
      return orders(randomTime(TIME_MIN, TIME_MAX), menu.pizza, tables[2]);
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};

const waiter3 = async() => {

  try {
    const order1 = await orders(randomTime(TIME_MIN, TIME_MAX), menu.hotdog, tables[1]);
    const order2 = await orders(randomTime(TIME_MIN, TIME_MAX), menu.pizza, tables[1]);
    const order3 = await orders(randomTime(TIME_MIN, TIME_MAX), menu.hotdog, tables[1]);

    console.log(order1);
    console.log(order2);
    console.log(order3);

  } catch (err) {
    console.log(err);
  }
}

const fetchOrders = async (tableItem) => {
  const URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';  
  try{
    const response = await fetch(URL);
    const result = await response.json();
    console.log(`### Orden: ${result.data} para la Mesa: ${tableItem}`);
    return `=== Pedido Servido: ${result.data} para la Mesa: ${tableItem}`;
  } catch (error) {
    console.log(`Error en la invocación de fetchOrders: ${error.message}`);
  }
}

const waiter4 = async () => {

  try {
    const order1 = await fetchOrders(tables[randomTime(0, tables.length-1)]);
    const order2 = await fetchOrders(tables[randomTime(0, tables.length-1)]);
    const order3 = await fetchOrders(tables[randomTime(0, tables.length-1)]);
    const order4 = await fetchOrders(tables[randomTime(0, tables.length-1)]);
    
    console.log(order1);
    console.log(order2);
    console.log(order3);
    console.log(order4);

  } catch (error) {
    console.log(`Error en la invocación de waiter4: ${error.message}`);
  }  
}

waiter();
waiter2();
waiter3();
waiter4();
