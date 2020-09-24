
const orders = (time, product1, product2, product3, table) => {
    console.log(`*** Pedido ${table}:  ${product1}, ${product2}, ${product3} ***`);
    return new Promise((resolve, reject) => {
        if (time<6000) {
            setTimeout(() => {
                resolve(`===> Pedido servido: ${product1}, ${product2}, ${product3}, tiempo de preparación ${time}ms para la ${table}`);
            }, time);
        } else {
            const error = new Error(`Sobrepasaste mi paciencia
            `)
            console.log(`Tu tiempo fue de: ${time}😞`);
            reject(error)
        }
    });
}

const menu = {
    hamburger: 'Combo Hamburguesa',
    hotdog: 'Combo Hot Dogs',
    pizza: 'Combo Pizza'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
const randomTime = () => Math.floor(Math.random() * (8000 - 100 + 1) + 1000)

const waiter3 = async () => {
    const esperaOrden = await orders(randomTime(), menu.hamburger, menu.pizza, menu.hotdog, table[1])
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }
waiter3();
console.log('P3');