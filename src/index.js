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

const waiter = () => {
	console.log(`Atendiendo la  mesa ${table[3]}`)
  orders(randomTime(1000, 8000), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
	console.log(`Recoger los pedidos de las mesas ${table[0]} y ${table[2]}`)
  orders(randomTime(1000, 8000), menu.hamburger, table[0])
		.then((res) => {
			console.log(res)
			return orders(randomTime(1000, 8000), menu.hamburger, table[2])
		}).then((res) => {
			console.log(res)
		})
    .catch((err) => console.error(err));
};

const waiter3 = () => {
	console.log(`Recoger el pedido de la mesa ${table[1]}`)
  orders(randomTime(1000, 8000), menu.hamburger, table[1])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const doOrders = async() => {
	await waiter()
	await waiter2()
	await waiter3()
}

doOrders().catch(error => {
	console.log('Error', error)
})
