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

function randomTime() {
  var min = 1, max = 8;
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand * 1000;
}

const waiter = () => {
  orders(randomTime(), `${menu.hamburger}`, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders(randomTime(), `${menu.hotdog}`, table[0])
    .then((res) => { 
      console.log(res);
      orders(randomTime(), `${menu.hotdog}`, table[2])
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

waiter2();

async function waiter3() {
  try{
    let promiseTable2 = new Promise((resolve, reject) => {
      resolve(orders(randomTime(), `${menu.pizza}`, table[1]));
    });

    let result = await promiseTable2;

    console.log(result);
  } catch(err){
    console.log('ERROR ORDEN MESA 2');
  }
}

waiter3();
