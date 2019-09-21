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

// const waiter = (time) => {
//   orders(time, menu.hamburger, table[3])
//     .then((res) => console.log(res))
//     .catch((err) => console.error(err));
//   };

const waiter2 = (time, product, table) => {
    orders(time, product, table)
        .then(res => console.log(res))
        .catch(err => console.log(err));
};

const waiter3 = async time => {
    try {
        let oreder1 = await orders(time, menu.hotdog, table[1]);
        console.log(oreder1);
    } catch (error) {
        console.log(error);
    }
};

//Reto 1
const timeRandom = () => Math.floor(Math.random() * 8000 + 1000);

//Reto 2
waiter2(timeRandom(), menu.pizza, table[0]);
waiter2(timeRandom(), menu.hotdog, table[2]);

//Reto 3
waiter3(timeRandom());

// waiter(timeRandom());
