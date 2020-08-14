const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
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

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

//Primer problema

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('Su orden no ha posido ser procesada');
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const randomTime = () => {
    return Math.floor(Math.random() * (8000 - 1000)) + 1000;
}

waiter();

//Segundo Problema

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('Su orden no ha posido ser procesada');
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => {
  return Math.floor(Math.random() * (8000 - 1000)) + 1000;
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => {
      console.log(res)
      return waiter2('orden1')
    })
    .then(res => {
      console.log(res)
      return waiter2('orden2')
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.error(err));
};

const waiter2 = (orden) => {
  switch (orden) {
    case 'orden1':
       return orders(randomTime(), menu.hotdog, table[0])
    case 'orden2':
      return orders(randomTime(), menu.pizza, table[2])
  }
};

waiter();

//Tercer Problema

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => {
  return Math.floor(Math.random() * (8000 - 1000)) + 1000;
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject(new Error('Error ', 'Su orden no ha posido ser procesada'));
    }
  });
}

const anotherFunction = async () => {
  try {
    //
    const waiter = await waiter1(0);
    const waiter21 = await waiter2(0);
    const waiter22 = await waiter2(1);
    const waiter31 = await waiter3(0);
    const waiter32 = await waiter3(1);
    const waiter33 = await waiter3(2);
    console.log(waiter);
    console.log(waiter21);
    console.log(waiter22);
    console.log(waiter31);
    console.log(waiter32);
    console.log(waiter33);
  } catch (err) {
    console.error(err);
  }
}

const waiter1 = () => {
  return orders(randomTime(), menu.hamburger, table[3])
};

const waiter2 = (orden) => {
  switch (orden) {
    case 0:
      return orders(randomTime(), menu.hotdog, table[0])
    case 1:
      return orders(randomTime(), menu.pizza, table[2])
  }
};

const waiter3 = (orden) => {
  switch (orden) {
    case 0:
      return orders(randomTime(), menu.hotdog, table[1])
    case 1:
      return orders(randomTime(), menu.pizza, table[1])
    case 2:
      return orders(randomTime(), menu.hotdog, table[1])
  }
};

anotherFunction();
