const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhttp = new XMLHttpRequest()
const API_ORDERS = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const menu = {
    hamburger: 'Combo Hamburguesa',
    hotdog: 'Combo Hot Dogs',
    pizza: 'Combo Pizza',
};
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const orders = (time, product, table, waiter) => {
    console.log(`### Orden: ${product} para ${table}`);
    return new Promise((resolve, reject) => {
        if (!time || !product || !table) {
            reject("Incomplete order, please complete all arguments")
        }
        setTimeout(() => {
            resolve(`===> Pedido servido por el mesero ${waiter}: ${product}, tiempo de preparación ${time}ms para la ${table}`);
        }, time);
    });
}

const fetchOrders = (url, time, table, waiter) => {
    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = () => {
            response = JSON.parse(xhttp.responseText)
            if(xhttp.status === 200) {
                resolve(orders(time, response.data, table, waiter))
            } else {
                reject(new Error(xhttp.status));
            }
        };
        xhttp.open("GET", url, false);
        xhttp.send();
    })
};

const randomTime = () => {
    const min = 1000;
    const max = 8000;
    const random = Math.random() * (max - min) + min;
    return Math.ceil(random)
};

const waiter = () => {
    orders(randomTime(), menu.hamburger, table[3], 1)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
};

const waiter2 = () => {
    try {
        orders(randomTime(), menu.hotdog, table[0], 2).then(res => {
            console.log(res)
            return orders(randomTime(), menu.pizza, table[2], 2).then(res => {
                console.log(res)
            });
        });
    } catch (e) {
        console.log(e)
    }
};

const waiter3 = async () => {
    try {
        const order1 = await orders(randomTime(), menu.hotdog, table[1], 3);
        const order2 = await orders(randomTime(), menu.pizza, table[1], 3);
        const order3 = await orders(randomTime(), menu.hotdog, table[1], 3);
        console.log(order1)
        console.log(order2)
        console.log(order3)
    } catch (e) {
        console.log(e)
    }
};

const waiter4 = async api => {
    const time = randomTime()
    try {
        console.log("Decidiendo pedido...")
        const order1 = await fetchOrders(api, time, table[4], 4)
        console.log("Decidiendo pedido...")
        const order2 = await fetchOrders(api, time, table[4], 4)
        console.log("Decidiendo pedido...")
        const order3 = await fetchOrders(api, time, table[4], 4)
        console.log("Decidiendo pedido...")
        const order4 = await fetchOrders(api, time, table[4], 4)
        console.log(order1)
        console.log(order2)
        console.log(order3)
        console.log(order4)
    } catch (err) {
        console.log(`Something is wrong!! | ${err}`)
    }

}
waiter();
waiter2();
waiter3();
waiter4(API_ORDERS)


