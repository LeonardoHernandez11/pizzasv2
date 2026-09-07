import express from "express";
import cors from 'cors';
import { 
  obtenerTodasLasPizzasAsync, 
  obtenerPizzaPorIdAsync,
  agregarPizzaAsync,
  actualizarPizzaAsync,
  borrarPizzaAsync 
} from './repositorios/pizza.repositorio.js';

const app = express();
app.use(cors());

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET: Obtener todas
app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync();
  return res.status(200).json(pizzas);
});

// GET: Obtener por ID
app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id;
  const pizza = await obtenerPizzaPorIdAsync(id);
  
  if (!pizza) {
    return res.status(404).json({ mensaje: "Pizza no encontrada" });
  }
  
  return res.status(200).json(pizza);
});

app.post("/api/v1/pizzas", async (req, res) => {
  const nuevaPizza = req.body;
  await agregarPizzaAsync(nuevaPizza);
  return res.status(201).json({ mensaje: "Pizza agregada correctamente", pizza: nuevaPizza });
});

app.put("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  const pizzaActualizada = await actualizarPizzaAsync(id, datosActualizados);
  
  if (!pizzaActualizada) {
    return res.status(404).json({ mensaje: "Pizza no encontrada para actualizar" });
  }
  
  return res.status(200).json({ mensaje: "Pizza actualizada correctamente", pizza: pizzaActualizada });
});

app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id;
  
  const borradoExitoso = await borrarPizzaAsync(id);
  
  if (!borradoExitoso) {
    return res.status(404).json({ mensaje: "Pizza no encontrada para eliminar" });
  }
  
  return res.status(200).json({ mensaje: "Pizza eliminada correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});