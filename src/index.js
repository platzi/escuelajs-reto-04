const MAX_TIME = 10000;
const MIN_TIME = 1000;
const MAX_EXPECTED_TIME = 8000;

const randomTime = () => Math.floor(Math.random() * ((MAX_TIME + 1) - MIN_TIME) + MIN_TIME);

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time > MAX_EXPECTED_TIME ) {
        reject(`=== El pedido: ${product} tardó mucho en salir, se demoró ${time}ms, el cliente ya se fue :(`)
      }
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const onResponse = (response) => console.log(response);
const onError = (error) => console.error(`Error: ${error}`); 

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(response => onResponse(response))
    .catch(error => onError(error));
};

const waiter2 = () => {

}

waiter();
