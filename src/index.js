const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time != null && product != null && table != null) {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  }
  else
  {
    reject(`Ocurrio un error`);
  }
  });
}

let MIN = 1000
let MAX = 8000

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}
const time = randomTime(MIN,MAX)
const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(time, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(time, menu.hotdog, table[0])
    .then((res) => {console.log(res); return orders(time,menu.pizza,table[2])}).then(res => console.log(res))
    .catch((err) => console.error(err));
};



const waiter3 = async () => {
  try {
    const pedido1 = await orders(time,menu.hotdog,table[1])
    console.log(pedido1)
    const pedido2 = await orders(time,menu.pizza,table[1])
    console.log(pedido2)
    const pedido3 = await orders(time,menu.hotdog,table[1])
    console.log(pedido3)
    
  } catch (error) {
      console.error(error)
  }
}


//waiter();
//waiter2();
waiter3();
//console.log(randomTime(MIN,MAX))