'use strict';

/**
 *
 * @param min
 * @param max
 * @returns {number}
 */
const randomTime = (min = 1000, max = 8000) =>
  Math.floor(Math.random() * (max - min) + min);

module.exports = randomTime;
