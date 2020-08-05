const orders = (time, product, table) => {
    console.log(`### Orden: ${product} para ${table}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
            );
            reject(new Error("Error"));
        }, time);
    });
};

const randomTime = (min, max) => {
    return Math.floor(Math.random() * (min - max) + min);
};

const menu = {
    hamburger: "Combo Hamburguesa",
    hotdog: "Combo Hot Dogs",
    pizza: "Combo Pizza",
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
    let time = randomTime(1000, 8000);
    orders(time, menu.hamburger, table[3])

        .then((res) => console.log(res))
        .catch((err) => console.error(err));
};

const waiter2 = () => {
    let time = randomTime(1000, 8000);
    orders(time, menu.hamburger, table[0])
        .then((res) => console.log(res));

    let time2 = randomTime(1000, 8000);
    orders(time2, menu.pizza, table[2])

        .then((res) => console.log(res))
        .catch((err) => console.error(err));
};

const waiter3 = async () => {
    try {
        let time1 = randomTime(1000, 8000);
        const order1 = await orders(time1, menu.hotdog, table[1]);

        let time2 = randomTime(1000, 8000);
        const order2 = await orders(time2, menu.pizza, table[1]);

        let time3 = randomTime(1000, 8000);
        const order3 = await orders(time3, menu.hotdog, table[1]);

        Promise.all([order1, order2, order3])
            .then((res) => console.log(res))
            .catch((err) => console.error(err));

    } catch (error) {
        console.error(error);
    }
};

waiter();
waiter2();
waiter3();
