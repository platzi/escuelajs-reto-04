const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
const tmax = 8000;
const tmin = 1000;
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const fetch = require('node-fetch');

const randomTime = () => {
  return Math.round(((Math.random()*(tmax - tmin)) + tmin)/1000)
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const randomMenuOption = () => {
  let y = Math.round((Math.random()*3 + 1))
  if(y == 1){
    return menu.hamburger
  }
  if(y == 2){
    return menu.hotdog
  }
  else{
    return menu.pizza
  }
}


  const  fetchOrders = async () => {

    try{
      const response = await fetch(API);
      const menuoption = await response.json();
        return menuoption.data
      }catch(err){
        return randomMenuOption();
      }

  }
  
const orders = (product, table, clients) => {

  for (let j = 0; j < product.length; j++){
    console.log(`### Orden: ${product[j]} para ${table}`); 
  }
  
(async function loop() {
  for (let i = 0; i < clients; i++) {
    let time = randomTime();
      await new Promise(resolve => setTimeout(resolve, time));
      console.log(`=== Pedido servido: ${product[i]}, tiempo de preparación ${time}s para la ${table}`);
  }
})();

/*
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}s para la ${table}`);
    }, time);
  });*/
}

const waiter = (clientes) => {
  let arraymenu = []
  for(let k = 0; k < clientes; k++){
    arraymenu.push(randomMenuOption())
  }
  orders(arraymenu, table[3],clientes)
    //.then((res) => console.log(res))
    //.catch((err) => console.error(err));
};

//waiter(1);

//Mesero 2. Mesa 1 y 3 

async function waiter2 (clientstable1, clientstable2) {
  let arraymenu = []
  for(let k = 0; k < clientstable1; k++){
    arraymenu.push(randomMenuOption())
  }

const ordenwatier21 = await orders(arraymenu, table[0],clientstable1);

let arraymenu2 = []
  for(let k = 0; k < clientstable2; k++){
    arraymenu2.push(randomMenuOption())
  }
  const ordenwatier22 = await orders(arraymenu, table[2],clientstable2);

}
//waiter2(1,1)

//Mesero 3. Mesa 2 con 3 clientes  
const waiter3 = (clients) => {
  let arraymenu = [menu.hotdog, menu.pizza, menu.hotdog]
  orders(arraymenu, table[0], clients)
  //  .then((res) => {
    //       return orders([menu.pizza], table[2])})
    //.then((res) => console.log(res))
    //.catch((err) => console.error(err));
    }

   //waiter3(3); 

    
const  waiter4 = async (comensales) => {
  let arreglomenu = [];
  for(let h = 0; h < comensales; h++){
  let itemx = await fetchOrders();
  arreglomenu.push(itemx);
  }
  console.log(arreglomenu);
  
  orders(arreglomenu, table[4], comensales)
}
waiter4(4);

