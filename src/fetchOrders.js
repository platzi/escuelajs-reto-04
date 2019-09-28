'use strict';

/**
 *
 * @type {{Headers?: Headers, FetchError?, Request?: Request, Response?: Response}|fetch}
 */
const fetch = require('node-fetch');

/**
 *
 * @param url_api
 * @param config
 * @returns {Promise<string>}
 */
const fetchOrders = async (
  url_api,
  config = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
) => {
  try {
    const response = await fetch(url_api, config);

    if (response.ok) {
      return Promise.resolve(
        `=== Pedido servido: ${(await response.json()).data}`
      );
    } else {
      return Promise.reject(new Error(`Error fetching url: ${url_api}`));
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = fetchOrders;
