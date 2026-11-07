# eliasgaribi-ctrl-z.github.io

Solo un desvío. La app de AL3D vivía en `eliasgaribi-ctrl-z.github.io/cotizador-al3d/` y desde
noviembre de 2026 vive en **https://cotizador-al3d.pages.dev**. Su repositorio es privado y
GitHub ya no la publica, así que esa ruta la sirve ahora este sitio, que manda cada dirección
vieja a la nueva conservando la ruta, la consulta y el ancla:

    github.io/cotizador-al3d/verificar.html?f=…&c=…  →  pages.dev/verificar.html?f=…&c=…

Lo importante son los **QR impresos** en las cotizaciones en PDF: apuntan a
`github.io/cotizador-al3d/verificar.html` y tienen que seguir verificando para siempre.

- `cotizador-al3d/index.html` y `cotizador-al3d/verificar.html` responden 200 y desvían.
- `404.html` desvía cualquier otra ruta bajo `/cotizador-al3d/`; fuera de ella solo avisa.
- Una sola línea de JavaScript, sin nada externo, y la CSP fija su huella: si se cambia el
  guion hay que recalcular el `sha256` del `<meta>` o el navegador no lo corre.

**No hay `cotizador-al3d/sw.js` a propósito.** Los teléfonos que ya tenían la app instalada la
siguen abriendo desde su service worker, con sus datos (el contador de folios, la letra del
teléfono, lo pendiente de subir), mientras su `sw.js` dé 404. Un `sw.js` aquí reemplazaría ese
service worker en cada teléfono: es el paso de la mudanza de datos, y va con ella.
