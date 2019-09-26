var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
var xhttp = new XMLHttpRequest();

function fetchData(url_api) {
  return new Promise(function(resolve, reject) {
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200)
          resolve(JSON.parse(xhttp.responseText));
        else return reject(url_api);
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (true) {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      } else {
        reject(`!== Pedido falló: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }
    }, time);
  });
}
const randomTime = () => {
  return Math.floor(Math.random() * (8000 - 1000) + 1000);
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

// orders(randomTime(), menu.hotdog, table[0]);
// orders(randomTime(), menu.pizza, table[2]);

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      orders(randomTime(), menu.pizza, table[2])
        .then((res) => console.log(res));
      console.log(res);
    })
    .catch((err) => console.error(err));
};
async function waiter3() {
    try {
      let pedido1 = await orders(randomTime(), menu.hotdog, table[1]);
      let pedido2 = await orders(randomTime(), menu.pizza, table[1]);
      let pedido3 = await orders(randomTime(), menu.hotdog, table[1]);
      console.log(pedido1);
      console.log(pedido2);
      console.log(pedido3);
    } catch (error) {
      //errorCallBack(error);
      console.log(error);
    }
};
async function waiter4(){
  try{
    let orden1 = await fetchData(API);
    let p1 = await orders(randomTime(), orden1.data, table[4]);
    let orden2 = await fetchData(API);
    let p2 = await orders(randomTime(), orden2.data, table[4]);
    let orden3 = await fetchData(API);
    let p3 = await orders(randomTime(), orden3.data, table[4]);
    let orden4 = await fetchData(API);
    let p4 = await orders(randomTime(), orden4.data, table[4]);     
    console.log(p1);
    console.log(p2);
    console.log(p3);
    console.log(p4);
  } catch (error) {
    //errorCallBack(error);
    console.log(error);
  }

}

waiter();
waiter2();
waiter3();
waiter4();


