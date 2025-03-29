// camino utilizado: window.fpdInstance.currentViewInstance.fabricCanvas

document.addEventListener("DOMContentLoaded", () => {
  const datos = window.datosProducto;

  const productoNombre = document.getElementById("productoNombre");
  const productoVariante = document.getElementById("productoVariante");
  const productoCantidad = document.getElementById("productoCantidad");
  const tecnicaSelect = document.getElementById("tecnicaSelect");

  const valorCm2 = document.getElementById("valorCm2");
  const dimensionesImagen = document.getElementById("dimensionesImagen");
  const superficieSpan = document.getElementById("superficie");
  const valorAplicacion = document.getElementById("valorAplicacion");
  const valorProducto = document.getElementById("valorProducto");
  const valorTotal = document.getElementById("valorTotal");
  const diasProduccion = document.getElementById("diasProduccion");
  const areaAplicacion = document.getElementById("areaAplicacion");

  function cargarDatosIniciales() {
    productoNombre.textContent = datos.nombre;
    productoVariante.textContent = datos.variante;
    productoCantidad.textContent = datos.cantidad;
    areaAplicacion.textContent = "Frente";
    cargarOpcionesTecnica();

    if (datos.dimensiones) {
      dimensionesImagen.textContent = `${datos.dimensiones.ancho} x ${datos.dimensiones.alto}`;
      const superficie = datos.dimensiones.ancho * datos.dimensiones.alto;
      superficieSpan.textContent = superficie.toFixed(2);
    }
  }

  function cargarOpcionesTecnica() {
    tecnicaSelect.innerHTML = "";
    for (const clave in datos.tecnicas) {
      const tecnica = datos.tecnicas[clave];
      const option = document.createElement("option");
      option.value = clave;
      option.textContent = `${tecnica.nombre || clave} ($${
        tecnica.valor_cm2
      }/cm²)`;
      tecnicaSelect.appendChild(option);
    }
    tecnicaSelect.value = Object.keys(datos.tecnicas)[0];
    actualizarValores();
  }

  function actualizarValores() {
    const clave = tecnicaSelect.value;
    const tecnica = datos.tecnicas[clave];
    if (!tecnica) return;

    valorCm2.textContent = `$ ${tecnica.valor_cm2.toLocaleString("es-AR")}`;
    diasProduccion.textContent = tecnica.diasProduccion;

    const superficie = datos.dimensiones.ancho * datos.dimensiones.alto;
    const totalAplicacion = superficie * tecnica.valor_cm2 * datos.cantidad;
    const totalProducto = datos.precioUnitario * datos.cantidad;
    const total = totalAplicacion + totalProducto;

    valorAplicacion.textContent = `$ ${Math.round(
      totalAplicacion
    ).toLocaleString("es-AR")}`;
    valorProducto.textContent = `$ ${Math.round(totalProducto).toLocaleString(
      "es-AR"
    )}`;
    valorTotal.textContent = `$ ${Math.round(total).toLocaleString("es-AR")}`;
  }

  tecnicaSelect.addEventListener("change", actualizarValores);
  cargarDatosIniciales();

  // 🔥 Acceso DEFINITIVO confirmado según la documentación oficial fpd-js
  const intervalFPDCanvas = setInterval(() => {
    const fabricCanvas = window.fpdInstance?.currentViewInstance?.fabricCanvas;

    if (fabricCanvas && fabricCanvas.on) {
      clearInterval(intervalFPDCanvas);
      console.log("✅ Usando instancia oficial FabricCanvas:", fabricCanvas);

      fabricCanvas.on("object:modified", (e) => {
        console.log("🔄 Objeto modificado detectado");

        const obj = e.target;
        if (!obj) return;

        // ... (cálculo de dimensiones) ...

        const textoContenido = document.getElementById("textoContenido");
        const textoHex = document.getElementById("textoHex");
        const textoPantone = document.getElementById("textoPantone");
        const textoFuente = document.getElementById("textoFuente");
        const textoTamano = document.getElementById("textoTamano");

        if (obj.type === "textbox" || obj.type === "i-text") {
          const hexColor = (obj.fill || "#000000").toUpperCase();
          const pantone = window.Pantones.obtenerPantoneDesdeHEX(hexColor);
          const fuente = obj.fontFamily || "sans-serif";
          const fontSizePx = obj.fontSize || 16;

          // Guardar en datosProducto
          window.datosProducto.texto = {
            contenido: obj.text,
            colorHex: hexColor,
            pantone: pantone,
            fuente: fuente,
            tamano: fontSizePx,
          };

          // Mostrar en la UI
          textoContenido.textContent = obj.text;
          textoHex.textContent = hexColor; // ← color en hex
          textoPantone.textContent = pantone; // ← pantone
          textoFuente.textContent = fuente;
          textoTamano.textContent = fontSizePx + " px";

          console.log(
            "📝 Texto con Pantone y Hex actualizado:",
            window.datosProducto.texto
          );
        } else {
          // Si no es texto, limpiamos
          window.datosProducto.texto = null;
          textoContenido.textContent = "-";
          textoHex.textContent = "-";
          textoPantone.textContent = "-";
          textoFuente.textContent = "-";
          textoTamano.textContent = "-";
        }

        // ... (cálculo de dimensiones en la UI) ...
        actualizarValores();
      });
    }
  }, 500);
});
