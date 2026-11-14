## Cotizador Comercial con IVA

* **Estudiante:** Juan Ramírez
* **Idea de proyecto final elegida:** Cotizador con IVA

## Estructura del proyecto
* `index.html`: Interfaz completa con formulario de productos y panel de totales fiscales.
* `css/styles.css`: Estilos limpios y diseño adaptable (Grid/Flexbox).
* `js/datos.js`: Estructura base de datos para la cotización.
* `js/storage.js`: Persistencia segura con `localStorage`.
* `js/ui.js`: Renderizado dinámico de la tabla y formateo de moneda colombiana.
* `js/app.js`: Lógica de adición, validación, recálculo de IVA y eventos comerciales.

## Cómo ejecutarlo
1. Abre esta carpeta en **Visual Studio Code**.
2. Haz clic derecho en `index.html` y selecciona **Open with Live Server** (necesario por el uso de módulos ES6 `type="module"`).
3. Agrega productos, modifica el porcentaje de descuento y comprueba cómo el subtotal, el IVA al 19% y el total se calculan instantáneamente.