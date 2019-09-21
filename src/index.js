const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(product === undefined){
      reject('es platillo no lo preparamos')
    }else if(!table){
      reject('La orden no tiene mesa')
    }else {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(varTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(varTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res)
      orders(varTime(), menu.pizza, table[2])
      .then(res => {
        console.log(res)
      })
      .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
    
};

async function waiter3() {
  console.log('calling')
  try{
    var orden1 = await orders(varTime(),menu.hotdog,table[1])
    var orden2 = await orders(varTime(),menu.pizza,table[1])
    var orden3 = await orders(varTime(),menu.hotdog,table[1])

    console.log(`Delivering\n${orden1}\n${orden2}\n${orden3}`);
  }catch (err){
    console.log(err)
  }
}

function varTime() {
  var max = 8000
  var min = 1000
  return Math.floor(Math.random() * (max -min) + min)
}

waiter2();
