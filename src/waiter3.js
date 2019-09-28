'use strict';

const orders = require('./orders.js');
const randomTime = require('./randomTime.js');
const menu = require('./menu.js');
const table = require('./table.js');

/**
 *
 * @returns {Promise<void>}
 */
const waiter3 = async () => {
    try {
        const ordersToServe = await Promise.all([
            orders(randomTime(), menu.hotdog, table[1]),
            orders(randomTime(), menu.pizza, table[1]),
            orders(randomTime(), menu.hotdog, table[1]),
        ]);

        ordersToServe.map(order => console.log(order))
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = waiter3;