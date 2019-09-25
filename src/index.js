const randomTime = () => Math.floor(Math.random() * (8000 - 1000 + 1) + 1000);

const orders = (time, product, table) => {
    console.log(`### Orden: ${product} para ${table}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`=== Pedido servido: ${product}, tiempo de preparación 
                ${time}ms para la ${table}`);
        }, time);
    });
}

const fetch = require('node-fetch');
const fetchOrder = () => {
    let url = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
    fetch(url)
        .then(response => response.json())
        .then(json => json.data);
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

const waiter2 = () => {
    orders(randomTime(), menu.hotdog, table[0])
        .then(res => {
            console.log(res);
            orders(randomTime(), menu.pizza, table[2])
                .then(res => console.log(res))
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
};

async function waiter3() {
    try {
        let order1 = await orders(randomTime(), menu.hotdog, table[1]);
        let order2 = await orders(randomTime(), menu.pizza, table[1]);
        let order3 = await orders(randomTime(), menu.hotdog, table[1]);

        console.log(order1);
        console.log(order2);
        console.log(order3);
    } catch (err) {
        console.log('Ha ocurrido un error con el mesero 3');
    }
}

async function waiter4() {
    try {
        let order1 = await orders(randomTime(), fetchOrder(), table[1]);
        let order2 = await orders(randomTime(), fetchOrder(), table[1]);
        let order3 = await orders(randomTime(), fetchOrder(), table[1]);
        let order4 = await orders(randomTime(), fetchOrder(), table[1]);

        console.log(order1);
        console.log(order2);
        console.log(order3);
        console.log(order4);
    } catch (err) {
        console.log('Ha ocurrido un error con el mesero 4');
    }
}

// waiter();
// waiter2();
// waiter3();
waiter4();