const axios = require('axios')

const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'

const finishedWaiters = []

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
}

const tables = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5']

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

const randomTime = () => Math.round(Math.random() * (8000 - 1000) + 1000)

const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value)

const errorHandler = (time, product, table) => {
  if (!time || !typeof time === 'int') {
    return '😞: Lo sentimos, no tenemos un tiempo para su pedido'
  }

  if (!table || !tables.includes(table)) {
    if (table) {
      return `😞: Lo sentimos, no tenemos la mesa ${table} disponible`
    }
    return '😞: Lo sentimos, no podemos atenderle si no nos pide una mesa'
  }

  if (!product || !Object.keys(menu).includes(product)) {
    if (product) {
      return `😞: Lo sentimos, no tenemos ${product}`
    }
    return '😞: Lo sentimos, no podemos servirle si no especifica su pedido'
  }

  return null
}

const requestFood = (time, product, table) => {
  console.log(`📣: Recibida orden de ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = errorHandler(time, product, table)
      error && reject(error)
      resolve(`🤖: Pedido servido de ${product} a la ${table}. Tiempo de preparación de ${time}ms`)
    }, time)
  })
}

const serveTable = (indications) => {
  const time = randomTime()
  const allOrders = []

  indications.forEach(indication => {
    const { food, table } = indication
    food.forEach(order => allOrders.push(requestFood(time, order, tables[table])))
  })

  return Promise.all(allOrders)
}

const attendVipClients = () => {
  const getVipSuccessAnswer = (res, waiter) => {
    res.forEach(phrase => console.log(`Mesonero ${waiter} ${phrase}`))
    finishedWaiters.push(waiter)
  }

  const getVipErrorAnswer = (err, waiter) => {
    finishedWaiters.push(waiter)
    console.log(`Mesonero ${waiter} ${err}`)
  }

  serveTable(indicationsWaiter1)
    .then(res => getVipSuccessAnswer(res, 1))
    .catch(err => getVipErrorAnswer(err, 1))

  serveTable(indicationsWaiter2)
    .then(res => getVipSuccessAnswer(res, 2))
    .catch(err => getVipErrorAnswer(err, 2))
}

const attendRegularClients = async () => {
  try {
    const res = await serveTable(indicationsWaiter3)
    finishNonPrioritizedAttendance(res, 2, 3)
  } catch (error) {
    finishNonPrioritizedAttendance(error, 2, 3)
  }
}

const finishNonPrioritizedAttendance = (message, priority, waiter) => {
  if (finishedWaiters.length === priority) {
    if (typeof message === 'object') {
      message.forEach(phrase => console.log(`Mesonero ${waiter} ${phrase}`))
    } else {
      console.log(`Mesonero ${waiter} ${message}`)
    }
    finishedWaiters.push(waiter)
  } else {
    setTimeout(() => finishNonPrioritizedAttendance(message, priority, waiter), 0)
  }
}

const fetchOrders = async () => {
  const indicationsWaiter4 = []
  try {
    for (let i = 0; i < 4; i++) {
      const fetchedOrder = await axios.get(API)
      const order = getKeyByValue(menu, fetchedOrder.data.data)
      const indication = { table: 1, food: [] }
      if (order) {
        indication.food.push(order)
      } else {
        indication.food.push(fetchedOrder.data.data)
      }
      indicationsWaiter4.push(indication)
    }
    const res = await serveTable(indicationsWaiter4)
    finishNonPrioritizedAttendance(res, 3, 4)
  } catch (error) {
    finishNonPrioritizedAttendance(error.message || error, 3, 4)
  }
}


fetchOrders()

attendRegularClients()

attendVipClients()
