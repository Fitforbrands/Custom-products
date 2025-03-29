document.addEventListener("DOMContentLoaded", function () {
  const fpd = new FancyProductDesigner(document.getElementById("fpd-target"), {
    productsJSON: "product.json",
    designsJSON: "design-categories.json",

    mainBarModules: ["file", "images", "designs", "text", "manage-layers"],

    actionsConfiguration: {
      file: [
        "info", // Muestra "Info"
        "download", // Muestra "Descargar"
        "print", // O lo que necesites
        "reset", // "Reiniciar"
        // 'preview-lightbox' queda omitido
      ],
      more: [
        "zoom", // "Zoom"
        "ruler", // Muestra toggle "Ruler"
        // 'guided-tour' queda omitido
      ],
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
    fileServerURL: "https://prowork-arg.netlify.app/img/",
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

    elementParameters: {
      printingBox: true,
      printingBoxMode: "limitModify",
    },
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

  // 🔧 Eliminamos la opción "Preview (Lightbox)"
  setTimeout(() => {
    const previewBtn = document.querySelector(
      '[data-action="preview-lightbox"]'
    );
    if (previewBtn) {
      previewBtn.remove();
    }
  }, 500);
});

// document.addEventListener("DOMContentLoaded", function () {
//   const fpd = new FancyProductDesigner(document.getElementById("fpd-target"), {
//     productsJSON: "product.json",
//     designsJSON: "design-categories.json",

//     mainBarModules: ["images", "designs", "text", "manage-layers"],
//     sidebarModules: ["zoom", "layers", "upload", "alignment", "undo-redo"],

//     fonts: [
//       { name: "Lobster", url: "google" },
//       { name: "Aller", url: "fonts/Aller.ttf" },
//       { name: "Pacifico", url: "fonts/Pacifico.ttf" },
//     ],

//     colorPicker: false, // desactiva el picker global
//     customTextParameters: {
//       autoCenter: true,
//       draggable: true,
//       removable: true,
//       colors: false,
//       boundingBoxMode: "limitModify",
//       boundingBox: {
//         x: 200,
//         y: 200,
//         width: 200,
//         height: 300,
//       },
//     },

//     printingBox: {
//       left: 100,
//       top: 100,
//       width: 200,
//       height: 300,
//       visibility: true,
//       style: {
//         strokeWidth: 2,
//         stroke: "#000000",
//         strokeDashArray: [5, 5],
//         fill: "transparent",
//       },
//     },
//   });

//   window.fpdInstance = fpd;

//   // 💣 Eliminar menú File y More
//   setTimeout(() => {
//     const fileMenu = document.querySelector('[data-action="menu"]');
//     const moreMenu = document.querySelector('[data-action="more"]');
//     fileMenu?.remove();
//     moreMenu?.remove();
//   }, 500);
// });
