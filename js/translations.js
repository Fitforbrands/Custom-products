document.addEventListener("DOMContentLoaded", function () {
  // Función para traducir los textos
  const translateLabels = () => {
    const translations = {
      "Add Image": "Imagenes",
      "Add Designs": "Diseños",
      "Manage Layers": "Capas",
      Images: "Imágenes",
      Designs: "Diseños",
      "Add Text": "Texto",
      Text: "Texto",
      Save: "Guardar",
      Load: "Cargar",
      Download: "Descargar",
      Undo: "Deshacer",
      Redo: "Rehacer",
      Print: "Imprimir",
      "Reset Product": "Reiniciar",
    };

    document.querySelectorAll(".fpd-label").forEach((label) => {
      const originalText = label.textContent.trim();
      if (translations[originalText]) {
        label.textContent = translations[originalText];
      }
    });

    document.querySelectorAll(".fpd-tooltip span").forEach((label) => {
      const originalText = label.textContent.trim();
      if (translations[originalText]) {
        label.textContent = translations[originalText];
      }
    });
  };

  // Ejecutar la traducción inicial
  translateLabels();

  // Opcional: ejecutar la traducción cada vez que cambie el contenido
  const observer = new MutationObserver(translateLabels);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
