const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 10000;

let precios = [];

// Cargar archivo de precios
function cargarPrecios() {
  try {
    const data = fs.readFileSync("precios_backend.json", "utf8");
    precios = JSON.parse(data);
    console.log("✅ Precios cargados:", precios.length);
  } catch (error) {
    console.error("❌ Error al cargar precios:", error.message);
  }
}

cargarPrecios();

// Buscar producto con coincidencia parcial y flexible
app.get("/precios/:nombre", (req, res) => {
  const nombre = req.params.nombre.toLowerCase().replaceAll(" ", "-");

  const coincidencias = precios.filter(p =>
    p.producto.toLowerCase().includes(nombre)
  );

  if (coincidencias.length > 0) {
    res.json(coincidencias);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

// Devolver todos los productos
app.get("/productos", (req, res) => {
  const nombres = precios.map(p => p.producto);
  res.json(nombres);
});

app.listen(port, () => {
  console.log(`🚀 Servidor activo en puerto ${port}`);
});