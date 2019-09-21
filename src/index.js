const orders = (time, product, table, state) => {
	console.log(`### Orden: ${product} para ${table}`)
	return new Promise((resolve, reject) => {
		if (state) {
			setTimeout(() => {
				resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`)
			}, time)
		} else {
			setTimeout(() => {
				reject(`=== Lo sentimos pero el Pedido ${product}, no se va poder servir en la ${table} porque se demoro ${time}ms`)
			}, time)
		}
	})
}

const randomState = () => Math.floor(Math.random() * Math.floor(2))
const randomTime = () => Math.floor(Math.random() * (1500 - 1000) + 1000)

const menu = {
	hamburger: 'Combo Hamburguesa',
	hotdog: 'Combo Hot Dogs',
	pizza: 'Combo Pizza',
}

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5']

const waiter = () => {
	orders(randomTime(), menu.hamburger, table[3], true)
		.then(response => console.log(response))
		.catch(error => console.error(error))
}

const waiterTwo = () => {
	orders(randomTime(), menu.hotdog, table[0], true)
		.then(response => {
			console.log(response)
			return orders(randomTime(), menu.pizza, table[2], true)
		})
		.then(response2 => {
			console.log(response2)
		})
		.catch(error => console.error(error))
}

const waiterThree = async () => {
	try {
		let orderOne = await orders(randomTime(), menu.hotdog, table[1], true)
		let orderTwo = await orders(randomTime(), menu.pizza, table[1], true)
		let orderThree = await orders(randomTime(), menu.hotdog, table[1], true)
		console.log(orderOne)
		console.log(orderTwo)
		console.log(orderThree)
	} catch (error) {
		console.log(error)
	}
}

waiter()
waiterTwo()
waiterThree()