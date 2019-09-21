'use strict';

const orders = require('./orders.js');
const randomTime = require('./randomTime.js');
const menu = require('./menu.js');
const table = require('./table.js');

const waiter = () => {
  try {
    orders(randomTime(), menu.hamburger, table[3]).then(res =>
      console.log(res)
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = waiter;
