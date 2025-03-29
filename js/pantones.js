// pantones.js

// Subconjunto de tu preferencia
const pantones = {
  "485C": "#E41A1A",
  "Black 6C": "#101820",
  White: "#FFFFFF",
  "Reflex Blue C": "#001489",
  "354 C": "#00A84F",
};

// Creamos la instancia
const nearestPantoneColor = window.nearestColor.from(pantones);

/**
 * Función que dado un color HEX (ej: '#E41A1A'),
 * devuelve el nombre Pantone más cercano (ej: '485C').
 */
function obtenerPantoneDesdeHEX(hex) {
  const match = nearestPantoneColor(hex);
  return match.name || match.value;
}

// Exponemos en `window` para usarlo en otros scripts
window.Pantones = {
  pantones,
  obtenerPantoneDesdeHEX,
};
