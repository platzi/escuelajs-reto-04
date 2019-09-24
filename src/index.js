function orders(time, product, table){
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(!product) {
      reject (`=== El pedido no ha sido servido y esta siendo preparado ===`)
    }
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table} ===`);
    }, time);
  })
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

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5']

const waiter = (table) => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}

const preparacion = {
  hamburger: randomTime(),
  hotdog: randomTime(),
  pizza: randomTime ()
}

const wainter2 = () => {
  orders(preparacion.hotdog,menu.hotdog,table[0])
    .then((res) => {console.log(res)
      return orders (preparacion.pizza, menu.pizza,table[2])
    })
    .then((res) => {console.log (res)})
    .catch((err) => console.error(err))
}

//wainter2()

const waiter3__1 = () => {
  orders(preparacion.hotdog,menu.hotdog,table[1])
   .then((res) => console.log(res))
   .catch((err) => console.log(err))
}

const waiter3__2 = () => {
  orders(preparacion.pizza,menu.pizza,table[1])
   .then((res) => console.log(res))
   .catch((err) => console.log(err))
}

const waiter3__3 = () => {
  orders(preparacion.hotdog,menu.hotdog,table[1])
   .then((res) => console.log(res))
   .catch((err) => console.log(err))
}

const pedido = async() => {
  try {
    const comida1 = waiter3__1()
    const comida2 = await waiter3__2(comida1)
    const comida3 = await waiter3__3(comida2)
      return await (comida3)
  } catch (error) {
    console.log((error) => console.log(error))
  }
}

pedido().then(entrega => console.log(entrega))