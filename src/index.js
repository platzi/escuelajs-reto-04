const orders = (time, product, table) => {

  console.log(`### Orden: ${product} para ${table}`);

  return new Promise((resolve, reject) => {      

      if (product && table ) {

        setTimeout(() => {
          resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`); 
        }, time);

      } else {
        
        reject(`Faltan elementos: ${time}   ${product} ${table}`);
      }
    

  });
}

let ordenes = []; 
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];


//SOLUCION RETO 1
const randomTime = () => {
  const min = 1000; 
  const max = 8000; 

  let namberRandom = Math.floor( Math.random() *  (max - min) + min ); 


  return  namberRandom; 
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const pedido1 = {
  tiempo: randomTime(),
  mesa: table[1],
  orden: menu.hotdog
}

const pedido2 = {
  tiempo: randomTime(),
  mesa: table[3],
  orden: menu.pizza
}

ordenes.push(pedido1,pedido2); 



const waiter = () => {
  orders(randomTime(), menu.hamburger, table[5]) //Se envia la peticion de la orden
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
};


//RETO 2
const waiter2 = (ordenesTomadas) => { 
      
    orders( ordenesTomadas[0].tiempo, ordenesTomadas[0].orden, ordenesTomadas[0].mesa )
      .then( (respuestaOrden) => {
        console.log(`respuesta de la orden: ${respuestaOrden}`);
        
        orders( ordenesTomadas[1].tiempo, ordenesTomadas[1].orden, ordenesTomadas[1].mesa )
          .then( (respuestaOrden2) => {
            console.log(`respuesta de la orden: ${respuestaOrden}`);
          })
      })
      .catch( (errorOrden) => {
        console.error(errorOrden);
      })

}


waiter2(ordenes); 