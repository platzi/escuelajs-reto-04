//Tiempo random. 
const randomTime = (min, max) => {
  return time = Math.floor(Math.random() * (max - min) + min);
}
//Orden random.
const menu = ['Combo Hamburguesa', 'Combo Hot Dogs', 'Combo Pizza'];
const randomOrder = (min, max) => {
  clientOrder = Math.floor(Math.random() * (max - min) + min);
  if(clientOrder === 1){
    return 0
  } else if (clientOrder === 2){
    return 1
  } else {
    return 2
  }
}
//Mesa
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

//Información de la mesa del waiter1.
const tableID = 3;

//Información de la o las mesas del waiter2
const waiter2TableInfo = {
  numOfTables: 2, //cantidad de mesas del waiter2.
  tableID: [0, 2] //id, o id´s de la mesa, o mesas.
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(tableID == undefined || tableID > 4){
      reject('No es valida la información de la mesa')
    } else {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time/1000} segundos para la ${table}`);
      }, time);
    }
  });
}

const waiter = () => {
  console.log('Waiter #1')
  orders(randomTime(1000, 8000), menu[randomOrder(1, 4)], table[tableID])
    .then((res) => console.log(res))
    .catch((rej) => console.error(rej));
};

//NOTA DEL AUTOR: no se si esto se pueda considerar promesas encadenadas.
/* 
const waiter2 = () => {
  console.log('Waiter #2')
  for(let i = 1, i2 = 0; i <= waiter2TableInfo.numOfTables; i++, i2++){
    orders(randomTime(1000, 8000), menu[randomOrder(1, 4)], table[waiter2TableInfo.tableID[i2]])
    .then((res) => console.log(res))
    .catch((rej) => console.error(rej));
  }
}; */ 

const waiter2 = () => {
  console.log('Waiter #2')
  orders(randomTime(1000, 8000), menu[randomOrder(1, 4)], table[waiter2TableInfo.tableID[0]])
    .then((res) => {
      console.log(res);
      return orders(randomTime(1000, 8000), menu[randomOrder(1, 4)], table[waiter2TableInfo.tableID[1]]);
    }).catch((rej) => console.error(rej))
    .then((res) => console.log(res))
    .catch((rej) => console.error(rej))
}

waiter();
waiter2();





