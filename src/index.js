const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        ) === true
      ) {
      } else {
        reject(
          `=== El Pedido: ${product},  para la ${table} no se pudo entregar`
        );
      }
    }, time);
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const randomTime = () => {
  let randomTime = Math.round(Math.random() * (1000 + 7000) + 1000);
  return randomTime;
};

const waiterTwo = () => {
  try {
    if (orders) {
      orders(randomTime(), menu.hotdog, table[0])
        .then(res => {
          console.log(res);
      orders(randomTime(), menu.pizza, table[2])
        .then(res => {
          console.log(res);
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      throw "No abrimos el restaurante! :(";
    }
  } catch (error) {
    console.log(error);
  }
};

// Reto 3 con Promise All sin async with bind function
const waiterThreeAllPromises = () => {
  try {
    if (orders) {

      const order1 = orders(randomTime(), menu.hotdog, table[1]);
      const order2 = orders(randomTime(), menu.pizza, table[1]);
      const order3 = orders(randomTime(), menu.pizza, table[1]);

      Promise.all([order1, order2, order3])
        .then(resAllOrders => {
          Array.prototype.forEach.call(resAllOrders, res => {
            console.log(res);
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      throw "No abrimos el restaurante! :(";
    }
  } catch (error) {
    console.log(error);
  }
};

// Reto 3 con async await
const waiterThree = async () => {
  try {
    const ordersTableTwo = [
      orders(randomTime(), menu.pizza, table[1]),
      orders(randomTime(), menu.hotdog, table[1]),
      orders(randomTime(), menu.hamburger, table[1])
    ];

    const res = await Promise.all(ordersTableTwo);
    console.log(res[0]);
    console.log(res[1]);
    console.log(res[2]);
  } catch (err) {
    console.log(`Ocurrió un error no podemos entregar su pedido :( : ${err}`);
  }
};

waiterTwo();
waiterThreeAllPromises();
waiterThree();
