const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
const port = process.env.PORT || 10000;

let precios = [];

function cargarPrecios() {
  try {
    const datos = fs.readFileSync("precios_backend.json", "utf8");
    precios = JSON.parse(datos);
    console.log("✓ Lista de precios cargada:", precios.length, "productos");
  } catch (error) {
    console.error("✘ Error al cargar precios:", error.message);
    precios = [];
  }
}

// Cargar precios al iniciar
cargarPrecios();

// Ruta para consultar el precio de un producto
app.get("/precios/:producto", (req, res) => {
  const nombre = req.params.producto.toLowerCase();
  const resultado = precios.find(p => p.producto.toLowerCase() === nombre);
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

// Ruta para ver todos los productos disponibles
app.get("/productos", (req, res) => {
  const nombres = precios.map(p => p.producto);
  res.json(nombres);
});

app.listen(port, () => {
  console.log(`🟢 Servidor corriendo en puerto ${port}`);
});
