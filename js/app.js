import { cotizacionBase } from './datos.js';
import { guardarCotizacionStorage, cargarCotizacionStorage } from './storage.js';
import { renderizarTabla, actualizarResumen, mostrarMensaje } from './ui.js';

const form = document.querySelector('#form-producto');
const inputDescuento = document.querySelector('#descuento');
const btnLimpiar = document.querySelector('#btn-limpiar');
const btnGuardar = document.querySelector('#btn-guardar-cotizacion');

let cotizacion = cargarCotizacionStorage(cotizacionBase);
inputDescuento.value = cotizacion.descuentoGeneral || 0;

recalcularYRenderizar();

// Capturar el evento del formulario evitando que recargue la página en la URL
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const datos = new FormData(form);
  const nombre = datos.get('nombre').trim();
  const precio = parseFloat(datos.get('precio'));
  const cantidad = parseInt(datos.get('cantidad'));

  if (!nombre) {
    mostrarMensaje('El nombre del producto es obligatorio.', 'error');
    return;
  }
  if (isNaN(precio) || precio <= 0) {
    mostrarMensaje('Ingrese un precio unitario válido mayor a 0.', 'error');
    return;
  }
  if (isNaN(cantidad) || cantidad < 1) {
    mostrarMensaje('La cantidad mínima es 1.', 'error');
    return;
  }

  const nuevoItem = {
    id: Date.now().toString(),
    nombre,
    precio,
    cantidad
  };

  // Agregar el producto al arreglo de la cotización
  cotizacion.productos.push(nuevoItem);
  
  // Limpiar campos de entrada del formulario de forma limpia
  form.reset();
  inputDescuento.value = cotizacion.descuentoGeneral;
  mostrarMensaje('¡Producto agregado con éxito a la cotización!', 'exito');

  recalcularYRenderizar();
});

// Cambiar descuento global en tiempo real
inputDescuento.addEventListener('input', () => {
  let desc = parseFloat(inputDescuento.value);
  if (isNaN(desc) || desc < 0) desc = 0;
  if (desc > 100) desc = 100;
  cotizacion.descuentoGeneral = desc;
  recalcularYRenderizar();
});

// Función para eliminar un producto individual de la tabla
function eliminarProducto(id) {
  cotizacion.productos = cotizacion.productos.filter(p => p.id !== id);
  mostrarMensaje('Producto eliminado de la lista.', 'exito');
  recalcularYRenderizar();
}

// Limpiar todo el cotizador
btnLimpiar.addEventListener('click', () => {
  cotizacion.productos = [];
  cotizacion.descuentoGeneral = 0;
  inputDescuento.value = 0;
  localStorage.removeItem('cotizador_iva_data_v1');
  mostrarMensaje('Cotización restablecida.', 'exito');
  recalcularYRenderizar();
});

// Guardar cotización en localStorage
btnGuardar.addEventListener('click', () => {
  guardarCotizacionStorage(cotizacion);
  mostrarMensaje('¡Cotización guardada exitosamente en el navegador!', 'exito');
});

// Función central que relaciona los datos, recalcula impuestos y actualiza la interfaz
function recalcularYRenderizar() {
  const subtotal = cotizacion.productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  const porcentajeDesc = cotizacion.descuentoGeneral || 0;
  const valorDescuento = subtotal * (porcentajeDesc / 100);
  const baseImponible = subtotal - valorDescuento;
  const valorIva = baseImponible * (cotizacion.porcentajeIva / 100);
  const total = baseImponible + valorIva;

  renderizarTabla(cotizacion.productos, eliminarProducto);
  actualizarResumen({
    subtotal,
    valorDescuento,
    valorIva,
    total
  });
}
// Control de navegación por pestañas (Calculadora / Productos)
const linkCalculadora = document.querySelector('#link-calculadora');
const linkProductos = document.querySelector('#link-productos');
const secciones = document.querySelectorAll('.vista-seccion');

function cambiarVista(vistaId) {
  secciones.forEach(seccion => {
    if (seccion.getAttribute('idvista') === vistaId) {
      seccion.classList.add('activa');
    } else {
      seccion.classList.remove('activa');
    }
  });

  // Actualizar clases activas en la barra de navegación
  if (vistaId === 'calculadora') {
    linkCalculadora.classList.add('activo');
    linkProductos.classList.remove('activo');
  } else {
    linkProductos.classList.add('activo');
    linkCalculadora.classList.remove('activo');
  }
}

linkCalculadora.addEventListener('click', (e) => {
  e.preventDefault();
  cambiarVista('calculadora');
});

linkProductos.addEventListener('click', (e) => {
  e.preventDefault();
  cambiarVista('productos');
});