'use strict';

/**
 *
 * @type {fetchOrders}
 */
const fetchOrders = require('./fetchOrders.js');

/**
 *
 * @type {string}
 */
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
/**
 *
 * @type {{headers: {"Content-Type": string}, method: string}}
 */
const CONFIG = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

/**
 *
 * @returns {Promise<void>}
 */
const waiter4 = async () => {
  try {
    const ordersToServe = await Promise.all([
      fetchOrders(API, CONFIG),
      fetchOrders(API, CONFIG),
      fetchOrders(API, CONFIG),
    ]);

    ordersToServe.map(order => console.log(order));
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = waiter4;
