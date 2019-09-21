const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
      reject (`== el pedido no ha sido servido y esta siendo preparado ==`)
  }
  )
}

function randomTime() {
    let max = 8
    let min = 1
      let tiempoRandom = (Math.floor(Math.random()*(max-min+1)+min))*1000
      return tiempoRandom
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = (table) => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

function wainter2() {
  let nuevosclientes = 1
  return new Promise((resolve,reject)=>{
    if (nuevosclientes>0) {
      resolve ('tomaPedido')
    } reject ('= esperar por el pedido ==')
  })
}

tomaPedido ()
  .then (()=>{

  })

// waiter();


console.log(randomTime())