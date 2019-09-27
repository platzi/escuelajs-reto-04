const max = 8;
const min = 1;
const miliSecs = 1000;

const orders = (time, product, table) => {
	console.log(`### Orden: ${product} para ${table}`);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`),
				reject(`Erorr message`);
		}, time);
	});
};

const menu = {
	hamburger: 'Combo Hamburguesa',
	hotdog: 'Combo Hot Dogs',
	pizza: 'Combo Pizza'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter2 = () => {
	orders(randomTime(), menu.pizza, table[0])
		.then(res => console.log(res))
		.catch(err => console.error(err));

	orders(randomTime(), menu.hotdog, table[2])
		.then(res => console.log(res))
		.catch(err => console.error(err));
};

const randomTime = () => {
	let orderTime = (Math.floor(Math.random() * max) + min) * miliSecs;
	return orderTime;
};

// const time = randomTime();
// console.log(time);
// randomTime();

waiter2();
