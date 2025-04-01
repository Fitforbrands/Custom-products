document.addEventListener("DOMContentLoaded", function () {
  const fpd = new FancyProductDesigner(document.getElementById("fpd-target"), {
    productsJSON: "product.json",
    designsJSON: "design-categories.json",

    mainBarModules: ["file", "images", "designs", "text", "manage-layers"],

    elementParameters: {
      printingBox: true,
      printingBoxMode: "limitModify",
    },
    actionsConfiguration: {
      // Dejamos vacío "file" para que no haya menú desplegable
      file: [],

      // Ponemos las acciones que queremos en la parte IZQUIERDA (horizontal)
      left: [
        "download", // es "descargar"
        "print", // es "imprimir"
        "reset", // es "reiniciar"
      ],
      // "zoom" y "ruler" normalmente aparecen a la derecha
      right: ["zoom", "ruler"],
      // si lo deseas, aquí puedes agregar más cosas en "center", etc.
      center: [],
    },

    fonts: [
      { name: "Lobster", url: "google" },
      {
        name: "Aller",
        url: "fonts/Aller.ttf",
        variants: {
          n7: "fonts/Aller__bold.ttf",
          i4: "fonts/Aller__italic.ttf",
          i7: "fonts/Aller__bolditalic.ttf",
        },
      },
      { name: "Pacifico", url: "fonts/Pacifico.ttf" },
    ],
    textTemplates: [
      {
        text: "Text Template Content",
        properties: {
          fontSize: 30,
          fontFamily: "Lobster",
        },
      },
      {
        text: "Another Text Template",
        properties: {
          fontSize: 50,
          fontFamily: "Pacifico",
        },
      },
    ],
    fileServerURL: "prowork-backend.up.railway.app/upload",
    facebookAppId: "",
    instagramClientId: "",
    instagramRedirectUri: "./data/html/instagram_auth.html",
    instagramTokenUri: "",
    colorPickerPalette: [
      "#000",
      "#f4cccc",
      "#fce5cd",
      "#fff2cc",
      "#d9ead3",
      "#d0e0e3",
      "#cfe2f3",
      "#d9d2e9",
      "#ead1dc",
      "#5f27cd",
      "#222f3e",
      "#10ac84",
    ],
    pixabayApiKey: "",
    pixabayLang: "en",
    pixabayHighResImages: false,

    customImageParameters: {
      removable: true,
      draggable: true,
      resizable: true,
      autoCenter: true,
      boundingBoxMode: "limitModify",
      boundingBox: {
        x: 200,
        y: 200,
        width: 200,
        height: 300,
      },
    },
    customTextParameters: {
      autoCenter: true,
      draggable: true,
      removable: true,
      colors: true,
      boundingBoxMode: "limitModify",
      boundingBox: {
        x: 200,
        y: 200,
        width: 200,
        height: 300,
      },
    },
    // Solo agregamos esta configuración
    printingBox: {
      left: 100,
      top: 100,
      width: 200,
      height: 300,
      visibility: true,
      style: {
        strokeWidth: 2,
        stroke: "#000000",
        strokeDashArray: [5, 5],
        fill: "transparent",
      },
      usePrintingBoxAsBounding: "yes", // Importante

      customImageParameters: {
        boundingBox: "printingBox",
        boundingBoxMode: "limitModify",
        // boundingBox: "printingBox" // a veces es necesario en ciertas versiones
      },
      customTextParameters: {
        boundingBox: "printingBox",
        boundingBoxMode: "limitModify",
        // boundingBox: "printingBox" // igual que arriba, si tu versión lo requiere
      },
    },
    actionsConfiguration: {
      file: [
        "new",
        "load",
        "save",
        "export-png", // sin "preview-lightbox"
      ],
    },
  });

  window.fpdInstance = fpd;

  console.log(
    "fpd instanceof FancyProductDesigner:",
    fpd instanceof FancyProductDesigner
  );
  console.log("Métodos disponibles en fpd:", fpd);

  fpd.addEventListener("ready", function () {
    console.log("✅ FancyProductDesigner está listo");

    fpd.addEventListener("element:add", function (data) {
      if (data.elementType === "image") {
        const element = data.element;
        const imgElement = element.$el[0];
        const base64Image = imgElement.src;

        console.log("📸 Imagen base64 detectada:");
        console.log(base64Image);

        // 🔁 Simulación de subida: reemplazar con URL pública
        const fakeURL =
          "https://via.placeholder.com/300x300.png?text=Subida+Simulada";

        // element.loadElement({
        //   source: fakeURL,
        //   title: "Imagen desde URL simulada",
        // });

        console.log("✅ Imagen reemplazada por una URL simulada");
      }
    });
  });

  function removeFPDButtonsByText() {
    // Seleccionamos todos los <span> dentro de un .fpd-btn
    const btnSpans = document.querySelectorAll(".fpd-btn span");
    btnSpans.forEach((span) => {
      const text = span.textContent.trim().toLowerCase();
      if (
        text === "preview lightbox" ||
        text === "guided tour" ||
        text === "info"
      ) {
        // Buscamos el contenedor padre con clase .fpd-btn
        const btn = span.closest(".fpd-btn");
        if (btn) {
          console.log(`Eliminando botón con texto: ${span.textContent.trim()}`);
          btn.remove();
        }
      }
    });
  }

  // Llamamos a la función un poco después que se cargue todo
  setTimeout(removeFPDButtonsByText, 3000);
});
