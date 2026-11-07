# eliasgaribi-ctrl-z.github.io

Solo un desvío. La app de AL3D vivía en `eliasgaribi-ctrl-z.github.io/cotizador-al3d/` y desde
noviembre de 2026 vive en **https://cotizador-al3d.pages.dev**. Su repositorio es privado y
GitHub ya no la publica, así que esa ruta la sirve ahora este sitio.

## Qué hace cada pieza

- **Los QR impresos** (`cotizador-al3d/verificar.html?f=…&c=…`) se desvían siempre, al instante,
  conservando la consulta. Tienen que seguir verificando para siempre.
- **Cualquier otra ruta bajo `/cotizador-al3d/`** (`index.html`, `404.html`): si el navegador no
  tiene datos de la app, o ya se mudó, desvía a la misma ruta en pages.dev. Si tiene datos,
  carga `https://cotizador-al3d.pages.dev/mudanza/mudanza.js` y ofrece pasarlos a la dirección
  nueva. Todo lo de la mudanza vive en ese archivo, en el repositorio de la app.
- **`cotizador-al3d/sw.js`** retira la app vieja de los teléfonos que la tenían instalada: borra
  sus cachés (solo las `al3d-*`), se da de baja y recarga la ventana, que llega a la mudanza.
  Los datos del teléfono no los toca: son los que la mudanza pasa.
- Fuera de `/cotizador-al3d/` solo se avisa; las demás páginas de la cuenta no se tocan.

El guion de las páginas va en línea y la CSP fija su huella: si se cambia, hay que recalcular el
`sha256` del `<meta>` (y copiar `404.html` a `cotizador-al3d/index.html` y `verificar.html`).
