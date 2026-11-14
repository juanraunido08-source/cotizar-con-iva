export function renderizarTabla(productos, onEliminar) {
  const tbody = document.querySelector('#lista-productos');
  tbody.innerHTML = '';

  if (productos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #64748b; padding: 2rem;">No hay productos agregados</td></tr>`;
    return;
  }

  productos.forEach((prod) => {
    const tr = document.createElement('tr');
    const subtotalItem = prod.precio * prod.cantidad;

    tr.innerHTML = `
      <td><strong>${escapeHtml(prod.nombre)}</strong></td>
      <td class="text-center">${prod.cantidad}</td>
      <td class="text-right">$${subtotalItem.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</td>
      <td class="text-center"><button type="button" class="btn-eliminar" data-id="${prod.id}" title="Eliminar">✕</button></td>
    `;

    tr.querySelector('.btn-eliminar').addEventListener('click', () => {
      onEliminar(prod.id);
    });

    tbody.appendChild(tr);
  });
}

export function actualizarResumen(calculos) {
  document.querySelector('#lbl-subtotal').textContent = `$${calculos.subtotal.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
  document.querySelector('#lbl-descuento').textContent = `-$${calculos.valorDescuento.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
  document.querySelector('#lbl-iva').textContent = `$${calculos.valorIva.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
  document.querySelector('#lbl-total').textContent = `$${calculos.total.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
}

export function mostrarMensaje(texto, tipo = 'exito') {
  const p = document.querySelector('#mensaje');
  p.textContent = texto;
  p.className = `mensaje ${tipo}`;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}