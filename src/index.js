const fetch = require('node-fetch');

const orders = (time, product, table) => {
    return new Promise((resolve, reject) => {
        if (!tables.includes(table)) {
            reject(`La mesa seleccionada no existe`)
        } else if (!Object.values(menu).includes(product)) {
            reject(`El  producto no esta en el menu`)
        } else {
            console.log(`### Orden: ${product} para ${table}`);
            setTimeout(() => {
                resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
            }, time);
        }
    });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const tables = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, tables[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

// waiter();

function randomTime() {
    const min = 1000
    const max = 8000

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const waiter2 = (mesas, combos) => {
    mesas.forEach(myfunction)

    function myfunction(item, index) {
        orders(randomTime(), combos[index], tables[item])
            .then((res) => {console.log(res)})
            .catch((err) => console.error(err));
    }
}

const mesas_ordenes = [0, 2]
const mesas_combo = [menu.hotdog, menu.pizza]

// waiter2(mesas_ordenes, mesas_combo);

const waiter3 = async (mesa_pedido, pedidos) => {
    let totalPedidos = []

    for (let i = 0; i < pedidos.length; i++)
        totalPedidos[i] = orders(randomTime(), pedidos[i], tables[mesa])

    const responses = Promise.all(totalPedidos)

    await responses
        .then(response => response.forEach((res) => console.log(res)))
        .catch(res => {console.log(res)})
}

const mesa = 2
const ordenes = [menu.hotdog, menu.pizza, menu.hotdog]

// waiter3(mesa, ordenes)

const API = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`
const fetchOrders = async () => {
    return new Promise((resolve, reject) => {
        fetch(API)
            .then(res => res.json())
            .then(body => resolve(body.data))
            .catch(rej => reject(`Ocurrió un error al obtener la orden: ${rej}`))
    });
};

const waiter4 = async (peticiones, numeroMesa) => {

    let pedidos = {}
    let ordenesAServir = []
    let existentes = 0

    for (let i = 0; i < peticiones; i++) {
        pedidos[i] = await fetchOrders().then(r => r)

        if (!Object.values(menu).includes(pedidos[i])) {
            console.log(`Por el momento no contamos con ${pedidos[i]}`)
        } else {
            ordenesAServir[existentes] = pedidos[i]
            existentes++
        }
    }

    let totalPedidos = []

    ordenesAServir.forEach((orden) => {
        totalPedidos.push(orders(randomTime(), orden, tables[numeroMesa]))
    })

    const responses = Promise.all(totalPedidos)

    await responses
        .then(response => response.forEach((res) => console.log(res)))
        .catch(err => console.log(err)
        )
}

waiter4(4, 4)

