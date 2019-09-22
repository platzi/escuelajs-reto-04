//Esta funcion recibe como parametro el tiempo la mesa y el produco
const orders = (time, product, table) => {
  //Muestra el producto enviado por consola
  console.log(`### Orden: ${product} para ${table}`);
  //Crea una nueva promesa
  return new Promise((resolve, reject) => {      

      if (product && table ) {
        //Ejecuata un cofigo en un tiempo estimado
        setTimeout(() => {
          resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`); //Envia la data en el tiempo indicado{ }
        }, time);//Ejecuta el pedido en el tiempo enviado por parametro

      } else {
        
        reject(`Faltan elementos: ${time}   ${product} ${table}`);
      }
    

  });
}

//Es un objeto que contiene productos ofresidos
const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};
//Contiene un array con las mesas disponibles
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];


const randomTime = () => {
  const min = 1000; 
  const max = 8000; 
  
  let namberRandom = Math.floor( Math.random() *  (max - min) + min ); 

  return  namberRandom; 
}


//FUNCION PRINCIPAL 
const waiter = () => {
  orders(randomTime(), menu.hamburger, table[5]) //Se envia la peticion de la orden
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
};

// waiter();


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

let ordenes = []; 
ordenes.push(pedido1,pedido2); 






//Envia a la mesa segun el tiempo en el que se resuelva
const waiter2 = (ordenesTomadas) => { 
      


    orders( ordenesTomadas[0].tiempo, ordenesTomadas[0].orden, ordenesTomadas[0].mesa )
      .then( (respuestaOrden) => {
        console.log(`respuesta de la orden: ${respuestaOrden}`);
        
        // orders( ordenesTomadas[1].tiempo, ordenesTomadas[1].orden, ordenesTomadas[1].mesa )
        //   .then( (respuestaOrden2) => {
        //     console.log(`respuesta de la orden: ${respuestaOrden}`);
        //   })

        
      })
      .catch( (errorOrden) => {
        console.error(errorOrden);
      })



}


console.log(`oredenes fuera del llamado ${ordenes}`);

waiter2(ordenes); 