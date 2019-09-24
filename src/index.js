const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const pedidoWaiter = {
  Combo: 'Combo Hamburguesa',
  table: 3
}

const pedidoWaiter2 = [
  {
    Combo: ['Combo Hotdog'],
    table: 0
  },
  {
    Combo: ['Combo Pizza'],
    table: 2
  }
]

const pedidoWaiter3 = {
  Combo: ['Combo Hotdog', 'Combo Pizza', 'Combo Hotdog'],
  table: 1
}


const randomTime = () => Math.floor(Math.random() * (8000 - 1000) + 1000);


const controllerErrors = (timeOrder, orderEat, tableOrder) => {

  if (!timeOrder) {

    return 'Error no se encontro el tiempo de la peticion';

  } else if (!orderEat) {

    return 'Error no se encontro la orden';

  } else {

    if (!tableOrder && tableOrder != 0) {

      return `Error, no se asigno ninguna mesa: ${tableOrder}`;

    }

  }

}

const orders = (time, product, tableNum) => {



  return new Promise((resolve, reject) => {

    const error = controllerErrors(time, product, tableNum);

    if (error) {

      reject(error);

    }

    console.log(`### Orden: ${product} para ${table[tableNum]}`);

    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table[tableNum]}`);
    }, time);

  });
}

const waiter = (ordenEnviada) => {

  console.log('---PEDIDO WAITER---');


  orders(randomTime(), ordenEnviada.Combo, ordenEnviada.table)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

};

const waiter2 = (ordenEnviada = []) => {

  console.log('---PEDIDO WAITER2---');



  orders(randomTime(), ordenEnviada[0].Combo, ordenEnviada[0].table)
    .then((dataPeticion) => {
      console.log(dataPeticion);
      orders(randomTime(), ordenEnviada[1].Combo, ordenEnviada[1].table)
        .then((dataPeticion2) => {
          console.log(dataPeticion2);
        })
    })
    .catch((err) => console.log(err))

}

const waiter3 = async (ordenEnviada) => {

  console.log('---PEDIDO WAITER3---');


  try {

    const primerPLato = await orders(randomTime(), ordenEnviada.Combo[0], ordenEnviada.table);
    const segundoPlato = await orders(randomTime(), ordenEnviada.Combo[1], ordenEnviada.table);
    const tercerPlato = await orders(randomTime(), ordenEnviada.Combo[2], ordenEnviada.table);

    console.log(primerPLato);
    console.log(segundoPlato);
    console.log(tercerPlato);


  } catch (err) {

    console.error(err);

  }


}

const fetchOrders = async (pedidosMenu) => {

  try {

    const response = await fetch(pedidosMenu);
    let data = await response.json();

    return data;


  } catch (err) {
    console.error('Hubo un error: ' + err);
    reject('Hubo un error: ' + err)
  }

}

//fetchOrders(URL);

// waiter(pedidoWaiter);
// waiter2(pedidoWaiter2); 
// waiter3(pedidoWaiter3); 


