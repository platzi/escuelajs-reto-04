const orders = (time, product, table) => {
    console.log(`### Orden: ${product} para ${table}`)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
            )
        }, time)
    })
}

const menu = {
    hamburger: 'Combo Hamburguesa',
    hotdog: 'Combo Hot Dogs',
    pizza: 'Combo Pizza'
}

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5']

const waiter = () => {
    orders(randomTime(), menu.hamburger, table[3])
        .then(res => console.log(res))
        .catch(err => console.error(err))
}

const randomTime = (max = 8000, min = 1000) =>
    Math.floor(Math.random() * (max - min) + min)

const waiter2 = () => {
    orders(randomTime(), menu.hotdog, table[0])
        .then(res => {
            console.log(res)
            return orders(randomTime(), menu.hotdog, table[2])
        })
        .then(res => console.log(res))
        .catch(error => console.log(error))
}
const waiter3 = async () => {
    try {
        let response = await Promise.all([
            orders(randomTime(), menu.hotdog, table[1]),
            orders(randomTime(), menu.pizza, table[1]),
            orders(randomTime(), menu.hotdog, table[1])
        ])
        console.log(response)
    } catch (bug) {
        console.error(bug)
    }
}

// waiter()
// waiter2()
// waiter3()

const fetchOrders = () => {
    console.log('execute fetchOrders')
    return new Promise((resolve, reject)=>{
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        const API_URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'
        xhr.onreadystatechange = function(event) {
            // console.log(`xhr.readyState:${xhr.readyState}, xhr.status:${xhr.status}`)
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(API_URL)
                }
            }
        }
        xhr.open('GET', API_URL)
        xhr.send()
    })
}

const waiter4 = async () => {
    try {
        let response = await Promise.all([
            fetchOrders(),
            fetchOrders(),
            fetchOrders(),
            fetchOrders()
        ])
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}



waiter4()
