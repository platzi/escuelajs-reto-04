const menu = {
    hamburger: 'Combo Hamburguesa',
    hotdog: 'Combo Hotdog',
    pizza: 'Combo Pizza'
}



const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5']






function randomTime() {
    var min = 1,
        max = 8
    var rand = Math.floor(Math.random() * (max - min + 1) + min)
    setTimeout(randomTime, rand * 1000);
    return rand
}

const tempo = randomTime()

const orders = (tempo, product, table) => {
    console.log(`Orden: "${product}" para ${table}`)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`=== Pedido servido: ${product}, tiempo de preparacion ${tempo}ms para la ${table}`)
        }, tempo)
        if(!table) {
            reject(`No se encuentra la mesa que buscaba`)
        }
    })
}









// WAITER 1

const waiter1 = () => {
    orders((tempo), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

waiter1()

// WAITER 2

const waiter2 = () => {
    orders((tempo), menu.hotdog, table[0])
    .then((res) => console.log(res))
    orders((tempo), menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

waiter2()

// WAITER 3

const waiter3 = async () => {
    const asyncPizza = await orders((tempo), menu.pizza, table[1])
    const asyncHotdog = await orders((tempo), menu.hotdog, table[1])
    const asyncHamburger = await orders((tempo), menu.hamburger, table[1])
    return {
        asyncPizza,
        asyncHotdog,
        asyncHamburger
    }
}

waiter3()
.then((res) => console.log(res))
.catch((err) => console.log(`Lo sentimos: ${err}`))


// WAITER 4

const fetchOrders = () => {
    return fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders')
    .then((data) => data.json())
    .then((data) => {
        let order = data.data
        

        const waiter4 = async () => {
            const asyncOrder1 = await orders((tempo), order, table[1])
            const asyncOrder2 = await orders((tempo), order, table[1])
            const asyncOrder3 = await orders((tempo), order, table[1])
            const asyncOrder4 = await orders((tempo), order, table[1])
            return {
                asyncOrder1,
                asyncOrder2,
                asyncOrder3,
                asyncOrder4
            }
        }

        waiter4()
        .then((res) => console.log(res))
        .catch((err) => console.log(`Lo sentimos: ${err}`))
    })
    .catch((err) => {
        console.log(err)
    })
}

fetchOrders()










