const fetch = require("isomorphic-fetch")

const constants = {
  MAX_TIME: 8000,
  MIN_TIME: 1000,
  API: "https://us-central1-escuelajs-api.cloudfunctions.net/orders"
}

const randomTime = () => {
  const randomTime = Math.round(Math.random() * constants.MAX_TIME)
  const time = randomTime < constants.MIN_TIME ? constants.MIN_TIME : randomTime
  return time
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`)
  return new Promise((resolve, reject) => {
    if (!time || !product || !table) {
      return reject(
        new Error(`Error: falta información: Tiempo = ${time}, Mesa = ${table}, Producto = ${product}`)
      )
    }
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      )
    }, time)
  })
}

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
}

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"]

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

const waiter3 = async () => {
  const tableTwoOrders = [menu.hotdog, menu.pizza, menu.hotdog]
  const promises = tableTwoOrders.map(order =>
    orders(randomTime(), order, table[1])
  )
  try {
    const results = await Promise.all(promises)
    results.forEach(result => console.log(result))
  } catch (error) {
    console.error(error)
  }
}

const fetchOrders = async () => {
  try {
    const orderResponse = await fetch(
      constants.API
    )
    const order = await orderResponse.json()
    return orders(randomTime(), order.data, table[4])
  } catch (err) {
    console.error(err.message)
  }
}

const waiter4 = async () => {
  try {
    const orders = await Promise.all([
      fetchOrders(),
      fetchOrders(),
      fetchOrders(),
      fetchOrders()
    ])

    orders.forEach(order => console.log(order))
  } catch (err) {
    console.log(err)
  }
}

waiter()
waiter2()
waiter3()
waiter4()
