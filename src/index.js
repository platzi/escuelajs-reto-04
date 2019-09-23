//Buen dia Oscar, espero estes bien.
//Realice los puntos 1,2,3 sin mayor inconvenientes
//Con ayuda de los tutores, eso si.
//En el punto cuatro, nno tuve problemas con waiter1  waiter2
//Pero con waiter3 tengo un error, dice solo puedes usar await en la funcion async
//le di mil vueltas y no consegui hacer que funcione
//Mil gracias por tu tiempo.
function PedidoComida() {
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const API = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`;
  let xhttp = new XMLHttpRequest();
  return new Promise ((resolve, reject) => {
    let fetchData=(url_api) => {
      xhttp.onreadystatechange = (event) => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200){
            resolve(JSON.parse(xhttp.responseText))
          }
          else{ 
            reject()
          }
        }
      };
      xhttp.open('GET', url_api, true);
      xhttp.send();
    }
    fetchData(API)
  })
}

const randomTime = () => {
  return Math.floor(Math.random() * 8000) + 1000;
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

// const menu = {
//   hamburger: 'Combo Hamburguesa',
//   hotdog: 'Combo Hot Dogs',
//   pizza: 'Combo Pizza',
// };

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  PedidoComida().then((data)=> {
    orders(randomTime(), data.data, table[3])
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }).catch(()=> {
    console.log(`--> No encontramos el pedido`)
  })
};

const waiter2 = () => {
  PedidoComida().then((data)=> {
    orders(randomTime(), data.data, table[0])
    .then((res) => {
      console.log(res);
      return orders(randomTime(), data.data, table[2])
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    })
  }).catch(()=> {
    console.log(`--> No encontramos el pedido`)
  })
  .catch((err) => console.error(err));
};
const waiter3 = async() => {
  try {
      PedidoComida().then((data)=> {
        //const result1 = await orders(randomTime(), data.data, table[1]);
      }).catch(()=> {
        console.log(`--> No encontramos el pedido `)
      })


      PedidoComida().then((data)=> {
        //const result2 = await orders(randomTime(), data.data, table[1]);
      }).catch(()=> {
        console.log(`--> No encontramos el pedido`)
      })

      
      PedidoComida().then((data)=> {
        //const result3 = await orders(randomTime(), data.data, table[1]);
      }).catch(()=> {
        console.log(`--> No encontramos el pedido`)
      })

      console.log(result1);
      console.log(result2);
      console.log(result3);
    } catch (error) {
      console.log("error")  
    }
};
waiter();
waiter2();
// waiter3();