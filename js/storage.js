const CLAVE_COTIZADOR = 'cotizador_iva_data_v1';

export function guardarCotizacionStorage(datos) {
  try {
    localStorage.setItem(CLAVE_COTIZADOR, JSON.stringify(datos));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
}

export function cargarCotizacionStorage(datosPorDefecto) {
  try {
    const guardado = localStorage.getItem(CLAVE_COTIZADOR);
    if (!guardado) {
      return { ...datosPorDefecto, productos: [] };
    }
    const parseado = JSON.parse(guardado);
    return {
      ...datosPorDefecto,
      ...parseado
    };
  } catch (error) {
    console.error('Error al leer localStorage:', error);
    return { ...datosPorDefecto, productos: [] };
  }
}