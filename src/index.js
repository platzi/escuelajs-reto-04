"use strict";

const fetch = require('node-fetch');

const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const config = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
}

const randomTime = (min = 1000, max = 8000) =>
  Math.floor(Math.random() * (max - min) + min);

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time) {
      reject('No tenemos un tiempo definido para entregar el pedido.')
    }

    if (!product) {
      reject('No se puede servir el pedido. No nos han dicho qué van a pedir.')
    }

    if (!table) {
      reject('No se puede servir el pedido. No sabemos a que mesa llevarlo.')
    }

    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const fetchOrders = async (
    url_api,
    config = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }) => {
  try {
    const response = await fetch(url_api, config)

    if (response.ok) {
      return Promise.resolve(`Pedido servido: ${(await response.json()).data}`);
    } else {
      return Promise.reject(`Error fetching url: ${url_api}`);
    }
  } catch (error) {
    console.error(error.message)
  }
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
      .then((res) => {
        console.log(res)
        return orders(randomTime(), menu.pizza, table[2])
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
};

waiter2()

const waiter3 = async () => {
  try {
    const listOfOrdersToServe = [
      await orders(randomTime(), menu.hotdog, table[1]),
      await orders(randomTime(), menu.pizza, table[1]),
      await orders(randomTime(), menu.hotdog, table[1])
    ]
    const ordersToServe = await Promise.all(listOfOrdersToServe)

    console.log(ordersToServe)
  } catch (error) {
    console.error(error.message)
  }
};

waiter3()

const waiter4 = async () => {
  try {
    const ordersToServe = await Promise.all([
        await fetchOrders(API),
        await fetchOrders(API),
        await fetchOrders(API)
    ])

    console.log(ordersToServe)
  } catch (error) {
    console.error(error.message)
  }
};

waiter4()