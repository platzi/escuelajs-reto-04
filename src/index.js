const orders = (time, product, table) => {
  console.log(` camara preparame una ### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

// waiter();

// 1st CHALLENGE:

function randomTime() {
 let randomNumber = Math.round(Math.random() * (8000 -  1000) + 1000);
 return randomNumber;
}
randomTime();

// 2nd CHALLENGE:

const waiter2 = () => {
  orders(randomTime(),menu.hamburger, table[0])
    .then((res) => console.log(res))
    .then(()=> {
      return orders(randomTime(),menu.pizza, table[2])
      .then((res) => console.log(res))
    })
    .catch((err) => console.error(err));    
}
 // waiter2();

// 3nd CHALLENGE:

const clientOne = orders(randomTime(),menu.hotdog, table[1]);
const clientTwo = orders(randomTime(),menu.pizza, table[1]);
const clientThree = orders(randomTime(),menu.hotdog, table[1]);

const threeOrders = [clientOne,clientTwo,clientThree]

async function waiter3() {
  try {
    await Promise.all(threeOrders)
    .then(
      result => setTimeout(()=>{
        result.map(order => console.log(`ROBOTCITO MESERO 3 DICE: ¡bon appetit! ${order}`))
      },1000)
    )
  }
  catch { error => console.log( `buuu esto se murio :( ${error}`)
  }
}
// aqui aplique el settimeout por que dice el reto pero no entiendo para que, no se si estoy haciendo mal mi codigo por que se tarda en resolver las promesas,
// y siento que ponerle el settime no lo sigue, o ese tiempo que estoy esperando es el tiempo de la petición o del set :s 

 waiter3();

// 4rd OPTIONAL CHALLENGE:

async function fetchOrders(){
  const url = ' https://us-central1-escuelajs-api.cloudfunctions.net/orders';
  const result = await fetch(url)
  const data = await result.json()
  console.log(data)
}
fetchOrders()

