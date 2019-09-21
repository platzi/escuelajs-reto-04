const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const tables = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, tables[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

// waiter();

function randomTime() {
    const min = 1000
    const max = 8000

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const waiter2 = (mesas, combos) => {
    mesas.forEach(myfunction)

    function myfunction(item, index) {
        orders(randomTime(), combos[index], tables[item])
            .then((res) => {console.log(res)})
            .catch((err) => console.error(err));
    }
}

const mesas_ordenes = [0, 2]
const mesas_combo = [menu.hotdog, menu.pizza]

waiter2(mesas_ordenes, mesas_combo);
