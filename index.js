// reto 1. random entre 10000 y 80000 ms


const menu = {
    'hamburger': 'Combo hamburguesa',
    'hotdog': '',
    'pizza': '',
}

const table = ['Mesa 1','Mesa 2','Mesa 1','Mesa 1','Mesa 1'];

const orders = (time, product, table) => {
    console.log(`### Order: ${product} para ${table}`);
    // promesa
    return new Promise(resolve, reject) => {
        setTimeout(()=> {
            resolve(`=== Pedido servido product, tiempo de preparacion ${time}`)
        },time);
    }
}

const waiter = () => {
    orders(6000, menu.hamburger,table[3])
    .then(
        (res)=> console.log(res);
    )
    .catch((err) => console.log(err);
    )
}