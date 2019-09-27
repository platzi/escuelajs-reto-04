const orders = (time, product, table) => {
	console.log(`### Orden: ${product} para ${table}`);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`),
				reject(`Error message`);
		}, time);
	});
};

const menu = {
	hamburger: 'Combo Hamburguesa',
	hotdog: 'Combo Hot Dogs',
	pizza: 'Combo Pizza'
};
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

async function waiter3() {
	try {
		let orderPizza = await orders(randomTime(), menu.pizza, table[1]);
		let orderHotdog = await orders(randomTime(), menu.hotdog, table[1]);
		let orderHamburger = await orders(randomTime(), menu.hamburger, table[1]);

		console.log(orderPizza);
		console.log(orderHotdog);
		console.log(orderHamburger);
	} catch (error) {
		console.log(error.message);
	}
}

const displayMenu = () => {
	menu.forEach(element => {
		console.log(element);
	});
};

const randomTime = (max = 8, min = 1) => {
	let orderTime = (Math.floor(Math.random() * max) + min) * 1000;
	return orderTime;
};

waiter3();
