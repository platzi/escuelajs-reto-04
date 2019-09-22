const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    if (!product) {
      reject(`No se tiene productos`)
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];


// Primer problema
// Crea una función llamada "randomTime" que te permita retornar un valor en mili segundos de forma aleatoria en el rango de 1000ms hasta 8000ms.
// Completa la función "orders" manejando el reject.
// Utiliza la función de randomTime
function randomTime() {
  var min = 1000, max = 8000;
  var rand = Math.floor((Math.random() * (max - min + 1)) + min);
  return rand;
}

const waiter = () => {
  orders(randomTime(), menu.hotdog, table[3])
    .then((respuesta) => console.log(respuesta))
    .catch((err) => console.error(err));
};


waiter();

