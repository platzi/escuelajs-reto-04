const fetch = require("node-fetch");

const orders = (time, product, table) => {
	console.log(`### Orden: ${product} para ${table}`);
	return new Promise((resolve, reject) => {
		if (product && time && table) {
			setTimeout(() => {
				resolve(
					`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
				);
			}, time);
		} else {
			reject(`Pedido no servido`);
		}
	});
};

const menu = {
	hamburger: "Combo Hamburguesa",
	hotdog: "Combo Hot Dogs",
	pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const randomTime = () => 1000 * ((Math.floor(Math.random() * 10) % 8) + 1);

const waiter = () => {
	orders(randomTime(), menu.hamburger, table[3])
		.then(response => console.log(response))
		.catch(error => console.error(error));
};

const waiter2 = () => {
	orders(randomTime(), menu.hotdog, table[0])
		.then(response => {
			console.log(response);
			return orders(randomTime(), menu.pizza, table[2]);
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => console.error(error));
};

const waiter3 = async () => {
	const order1 = await orders(randomTime(), menu.hamburger, table[1]);
	const order2 = await orders(randomTime(), menu.hotdog, table[1]);
	const order3 = await orders(randomTime(), menu.pizza, table[1]);
	console.log(order1, order2, order3);
};

const fetchOrders = async table => {
	console.log(`Empieza el pedido`);
	let timeStart = new Date().getTime();
	let returnData;
	console.time("tiempo de preparacion");
	await fetch("https://us-central1-escuelajs-api.cloudfunctions.net/orders")
		.then(response => {
			return response.json();
		})
		.then(response => {
			let timeEnd = new Date().getTime();
			time = timeEnd - timeStart;
			returnData = `=== Pedido servido: ${response.data},tiempo de preparación ${time}ms para la ${table}`;
		})
		.catch(error => {
			returnData = "No se pudo entregar el pedido";
		});
	return returnData;
};

const waiter4 = async () => {
	let order1 = await fetchOrders(table[4]);
	let order2 = await fetchOrders(table[4]);
	let order3 = await fetchOrders(table[4]);
	let order4 = await fetchOrders(table[4]);
	console.log("Orden 1: ", order1);
	console.log("Orden 2: ", order2);
	console.log("Orden 3: ", order3);
	console.log("Orden 4: ", order4);
};

waiter();
waiter2();
waiter3();
waiter4();
