const randomTime = () => Math.round(Math.random() * (8000 - 1000) + 1000)

const errorHandler = (time, product, table) => {
  if (!time || !typeof time === 'int') {
    return 'No tenemos un tiempo para su pedido'
  }

  if (!table || !tables.includes(table)) {
    if (table) {
      return `Lo sentimos, no tenemos la mesa ${table} disponible`
    }
    return 'Lo sentimos, no podemos atenderle si no nos pide una mesa'
  }

  if (!product || !Object.keys(menu).includes(product)) {
    if (product) {
      return `El producto ${product} no se encuentra disponible`
    }
    return 'Lo sentimos, no podemos servirle si no especifica su pedido'
  }

  return false
}


const orders = (time, product, table) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = errorHandler(time, product, table)

      if (error) {
        reject(error)
      }

      resolve(`Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table} \n`)
    }, time)
  })
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
}

const tables = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5']

const waiters = async (indications) => {
  const time = randomTime()
  const allOrders = []
  let res
  for (indication of indications) {
    const { food, table } = indication
    for (order of food) {
      try {
        res = await orders(time, order, tables[table])
        allOrders.push(res)
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  return allOrders
}

const indicationsWaiter1 = [
  {
    food: ['hamburger'],
    table: 3
  }
]

const indicationsWaiter2 = [
  {
    food: ['hotdog'],
    table: 0
  },
  {
    food: ['pizza'],
    table: 2
  }
]

const indicationsWaiter3 = [
  {
    food: ['hotdog', 'pizza', 'hotdog'],
    table: 1
  }
]


const getOrders = async () => {
  waiters(indicationsWaiter1).then(res => console.log(`Waiter 1 says: ${res}`))

  waiters(indicationsWaiter2).then(res => console.log(`Waiter 2 says: ${res}`))

  try {
    const thirdWaiter = await waiters(indicationsWaiter3)
    console.log(`Waiter 3 says: ${thirdWaiter}`)
  } catch (error) {
    throw error
  }
}

const fetchOrders = () => {

}


getOrders()
