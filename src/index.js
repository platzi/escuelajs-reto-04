const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);

    // reject('Hubo un incendio en la cocina, tenemos que cerrar.')
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = (menu, table) => {
  prepareOrder(menu, table);
};

const prepareOrder = (menu, table) => {
  orders(randomTime(), menu, table)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  new Promise((resolve, reject) => {
    resolve(prepareOrder(menu.hotdog, table[0]));
  });

  new Promise((resolve, reject) => {
    resolve(prepareOrder(menu.pizza, table[2]));
  });
};

const waiter3 = async () => {


 const orderlist = [
   //First order, table 2
   prepareOrder(menu.pizza, table[1]),
  //Second order, table 2
  prepareOrder(menu.hamburger, table[1]),
  //third order, table 2
  prepareOrder(menu.hotdog, table[1])
 ]

  await Promise.all(orderlist).then(res => console.log(res))
                                             .catch(err => console.log(err));;

};

const randomTime = (max = 8000, min = 1000) => {
  return Math.floor(Math.random() * (max - min) + min);
};

waiter();
waiter2();
waiter3();