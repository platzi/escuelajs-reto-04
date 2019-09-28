'use strict';

const orders = require('./orders.js');
const randomTime = require('./randomTime.js');
const menu = require('./menu.js');
const table = require('./table.js');

const waiter2 = () => {
  try {
    orders(randomTime(), menu.hotdog, table[0])
      .then(res => {
        console.log(res);
        return orders(randomTime(), menu.pizza, table[2]);
      })
      .then(res => console.log(res));
  } catch (error) {
    console.error(error);
  }
};

module.exports = waiter2;
