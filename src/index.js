const randomTime = () => {
  let minValue = 1000,
    maxValue = 8000;
  const randomNumber = Math.random() * (maxValue - minValue) + minValue;
  return randomNumber.toFixed(0);
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time != null) {
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
      }, time);
    } else {
      reject(new Error("Ups! Hubo un error con el tiempo..."));
    }
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then(response => console.log(response))
    .catch(error => console.error(error));
};
const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[1])
    .then(response => {
      console.log(response);
    })
    .then(
      orders(randomTime(), menu.pizza, table[3]).then(response => {
        console.log(response);
      })
    )
    .catch(error => console.error(error));
};

const waiter3 = () => {
  orders(randomTime(), menu.hotdog, table[2])
    .then(response => {
      console.log(response);
    })
    .then(
      orders(randomTime(), menu.pizza, table[2]).then(response => {
        console.log(response);
      })
    )
    .then(
      orders(randomTime(), menu.hotdog, table[2]).then(response => {
        console.log(response);
      })
    )
    .catch(error => console.error(error));
};

async function responseWaiter3() {
  try {
    const result = await waiter3();
    console.log(result);
  } catch {
    return new Error("Ups! ha ocurrido un error...");
  }
}

// waiter();
// waiter2();
responseWaiter3();
