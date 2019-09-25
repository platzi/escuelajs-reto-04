const fetch = require('node-fetch');
const URL_ORDERS = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

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
  
  const randomTime = (max = 8000, min = 1000) => {
    return Math.floor(Math.random() * (max - min)) + min;
  
  }
  
  const prepareOrder = (menuRest , tableRest) => {
    orders(randomTime(), menuRest, tableRest)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  
  const waiter =() => {
    new Promise((resolve, reject) => {
      resolve(prepareOrder( menu.hamburger, table[3]))
    });
  }
  
  const waiter2 = () => {
    new Promise((resolve, reject) => {
      resolve(prepareOrder( menu.hotdog, table[0]))
    });
    new Promise((resolve, reject) => {
      resolve(prepareOrder( menu.pizza, table[2]))
    });
  };
  
  
  
  const waiter3 = async () => {
    const orderlist = [
     //primera orden 
     prepareOrder(menu.pizza, table[1]),
     //segunda orden
     prepareOrder(menu.hamburger, table[1]),
     //tercera orden
     prepareOrder(menu.hotdog, table[1])
    ]
   
     await Promise.all(orderlist).then(res => console.log(res))
                                 .catch(err => console.log(err));;
   };

    //Consulta Api
    const fetchOrders = async () => {
        const responseOrder = await fetch(URL_ORDERS);
        return await responseOrder.json();
    }

  const waiter4 = async () => {
    const fetchPromises = [];
    //Creacion pedidos
    for(let i = 0; i < 4; i++)
    {
      fetchPromises.push(fetchOrders());
    }
  
    try {
      let response = await Promise.all(fetchPromises);
      let promises = response.map(order => orders(randomTime(), order, table[4]));
      let orderPromises = await Promise.all(promises);
      orderPromises.map(order => console.log(order));
    } catch (error) {
      console.log(error);
    }
  }
  
  waiter();
  waiter2();
  waiter3();
  waiter4();