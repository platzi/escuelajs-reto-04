const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`)
  return new Promise((resolve, reject) => {
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

const url = "https://us-central1-escuelajs-api.cloudfunctions.net/orders"
const fetch = require("node-fetch")

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"]

const randomTime = (min = 1000, max = 8000) =>
  Math.floor(Math.random() * (max - min) + min)

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

waiter()

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
      .then(res => console.log(res))
    })
    .catch(err => console.log(err))
}

waiter2()

const waiter3 = async () => {
  try {
    const pedido1 = await orders(randomTime(), menu.hotdog, table[1])
    const pedido2 = await orders(randomTime(), menu.pizza, table[1])
    const pedido3 = await orders(randomTime(), menu.hotdog, table[1])

    console.log(pedido1)
    console.log(pedido2)
    console.log(pedido3)
  } catch (error) {
    console.log(`No se pudo entregar el pedido ${orders}`)
  }
}

waiter3()

const fetchOrders = async (time, table) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    const newProduct = data.data
    console.log(`### Orden: ${newProduct} para la mesa ${table}`)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${newProduct}, tiempo de preparación ${time}ms para la ${table}`
        )
      }, time)
    })
  } catch (error) {
    console.log(`No se pudo entregar el pedido`)
  }
}

const waiter4 = async () => {
  try {
    const pedido1 = await fetchOrders(randomTime(), table[4])
    const pedido2 = await fetchOrders(randomTime(), table[4])
    const pedido3 = await fetchOrders(randomTime(), table[4])
    const pedido4 = await fetchOrders(randomTime(), table[4])

    console.log(pedido1)
    console.log(pedido2)
    console.log(pedido3)
    console.log(pedido4)
  } catch (error) {
    console.log(`No se pudo entregar el pedido`)
  }
}

waiter4()
