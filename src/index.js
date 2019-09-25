const fetch = require("node-fetch");

const randomTime = () => {
	let number = ((Math.floor(Math.random() * 10) % 8) + 1) * 1000;
	return number;
};

const orders = (time, product, table) => {
	console.log(`### Orden: ${product} para ${table}`);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(
				`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
			);
		}, time);
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
	let time = randomTime();
	const pedido1 = menu.hotdog;
	const pedido2 = menu.pizza;

	orders(time, pedido1, table[0])
		.then(response => {
			console.log(response);
			time = randomTime();
			return orders(time, pedido2, table[2]);
		})
		.then(response => console.log(response))
		.catch(error => console.log(error));
};

const waiter3 = async () => {
	let time = randomTime();
	const pedido1 = menu.hotdog;
	const pedido2 = menu.pizza;
	const pedido3 = menu.hotdog;

	let entrega = [];
	try {
		await orders(time, pedido1, table[1]).then(response =>
			entrega.push(response)
		);
		await orders(time, pedido2, table[1]).then(response =>
			entrega.push(response)
		);
		await orders(time, pedido3, table[1]).then(response =>
			entrega.push(response)
		);
		console.log(entrega);
	} catch (error) {
		throw error.message;
	}
};

async function fetchOrders() {
	try {
		const response = await fetch(
			"https://us-central1-escuelajs-api.cloudfunctions.net/orders"
		);
		const data = await response.json();
		return data;
	} catch (error) {
		throw error.message;
	}
}
const waiter4 = async () => {
	const time = randomTime();
	const pedido1 = await fetchOrders();
	const pedido2 = await fetchOrders();
	const pedido3 = await fetchOrders();
	const pedido4 = await fetchOrders();

	let entrega = [];
	try {
		await orders(time, pedido1.data, table[1]).then(response =>
			entrega.push(response)
		);
		await orders(time, pedido2.data, table[1]).then(response =>
			entrega.push(response)
		);
		await orders(time, pedido3.data, table[1]).then(response =>
			entrega.push(response)
		);
		await orders(time, pedido4.data, table[1]).then(response =>
			entrega.push(response)
		);
		console.log(entrega);
	} catch (error) {
		throw error.message;
	}
};
waiter();
waiter2();
waiter3();
waiter4();
