'use strict';

/**
 *
 * @param time
 * @param product
 * @param table
 * @returns {Promise<unknown>}
 */
const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time) {
      reject('No tenemos un tiempo definido para entregar el pedido.');
    }

    if (!product) {
      reject('No se puede servir el pedido. No nos han dicho qué van a pedir.');
    }

    if (!table) {
      reject('No se puede servir el pedido. No sabemos a que mesa llevarlo.');
    }

    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
  });
};

module.exports = orders;
