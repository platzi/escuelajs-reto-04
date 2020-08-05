## DESCRIPTION

Solución al reto 04 de Escuela de JavaScript

Nombre: Juan Rios [C5]
Usuario Platzi: JuanDanielRR

## Ciudad
- [ ] Ciudad de México
- [x] Bogotá

## Reto:
  - [x] Primer problema
  function randomTime(min, max) {
  return randomTimer = Math.floor(Math.random() * (max - min) + min)
  
}

//randomTime(1000, 8000) //llamando la funcion de esta manera nos dara un rango de 1 a 8k
  
  - [x] Segundo problema
  const waiter2 = () => {
  orders (randomTime(1000, 8000), menu.hotdog, table[0])
  .then((res) => console.log(res))
  return orders (randomTime(1000, 8000), menu.pizza, table[2])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));    
}
  
waiter2();
  - [x] Tercer problema
  const waiter3 = async () => {
  try {
    const allDishes = [
      orders(randomTime(1000, 8000), menu.hotdog, table[1]),
      orders(randomTime(1000, 8000), menu.pizza, table[1]),
      orders(randomTime(1000, 8000), menu.hotdog, table[1])
    ];
    const readyToWork = await Promise.all(allDishes);
      console.log(readyToWork[0])
      console.log(readyToWork[1])
      console.log(readyToWork[2])
    } catch (error) {
    console.log(`Es imposible entregar la orden por ahora, debido a ${error}`);
    }
};

waiter3();
  - [ ] Cuarto Problema (Opcional)
