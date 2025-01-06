document.addEventListener("DOMContentLoaded", function () {
  // Función para traducir los textos
  const translateLabels = () => {
    const translations = {
      "Add Image": "Subir Imagen",
      Images: "Imágenes",
      Designs: "Diseños",
      "Add Text": "Agregar Texto",
      Text: "Texto",
      Save: "Guardar",
      Load: "Cargar",
      Download: "Descargar",
      Undo: "Deshacer",
      Redo: "Rehacer",
    };

    document.querySelectorAll(".fpd-label").forEach((label) => {
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
