// Esta es la capa donde se persisten los datos

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let pizzas = [{ id: 1, nombre: "Hawaiina", descripcion: "Jamon y piña" }]

/**
 * Regresa una lista de las pizzas
 * @returns []
 */
export async function obtenerTodasLasPizzasAsync() {
  await sleep(2000)
  return pizzas
}

/**
 * Regresa la pizza del id buscado o undefined si no lo encuentra
 * @param {*} id 
 */
export async function obtenerPizzaPorIdAsync(id) {
  await sleep(1000)
  const pizza = pizzas.find(x => x.id == id)
  return pizza
}

/**
 * Agrega una nueva pizza a la lista
 * @param {*} pizza 
 */
export async function agregarPizzaAsync(pizza) {
  await sleep(1000)
  pizzas.push(pizza)
}

/**
 * Actualiza los datos de una pizza existente
 * @param {*} id
 * @param {*} datosActualizados
 * @returns La pizza actualizada o undefined
 */
export async function actualizarPizzaAsync(id, datosActualizados) {
  await sleep(1000)
  
  const index = pizzas.findIndex(x => x.id == id)
  
  if (index !== -1) {
    pizzas[index] = { ...pizzas[index], ...datosActualizados, id: pizzas[index].id }
    return pizzas[index]
  }
  
  return undefined
}

/**
 * Elimina una pizza de la lista usando su id
 * @param {*} id 
 * @returns true si se eliminó o false si no se encontró
 */
export async function borrarPizzaAsync(id) {
  await sleep(1000)
  
  const index = pizzas.findIndex(x => x.id == id)
  
  if (index !== -1) {
    pizzas.splice(index, 1)
    return true
  }
  
  return false
}