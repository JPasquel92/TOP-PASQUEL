# TOP PASQUEL · Proyecto frontend

Landing corporativa de ingeniería topográfica y geomática, desarrollada con HTML5, CSS3 y JavaScript vanilla. El proyecto funciona sin instalaciones, compilación, frameworks ni bibliotecas de JavaScript.

## 1. Concepto visual y secciones

La identidad combina negro y amarillo seguridad con blanco y gris cálido. Una tipografía condensada en titulares, fotografías de campo, retículas e iconos técnicos comunican precisión y trabajo profesional. El diseño sigue una estrategia mobile first y amplía las columnas con CSS Grid cuando hay espacio suficiente.

La navegación conduce por portada, servicios, presentación de empresa, tecnología, aplicaciones de proyectos, cobertura, preguntas frecuentes y cotización. Se incluyen seis servicios y una carta de presentación en PDF. El isotipo es una propuesta gráfica editable en SVG, creada para este proyecto.

Las fotografías de stock se identifican como referenciales. Las tres aplicaciones del portafolio son casos ilustrativos y se pueden reemplazar por trabajos reales autorizados. No se incluyen testimonios, cifras comerciales, certificaciones ni clientes inventados.

## 2. Organización de carpetas

En el ZIP, la carpeta principal es `top-pasquel-frontend/`. Su contenido es:

| Ruta | Contenido |
| --- | --- |
| `index.html` | Estructura, contenido, SEO, formulario y diálogos |
| `css/styles.css` | Identidad visual, componentes, responsive y accesibilidad |
| `js/script.js` | Configuración de WhatsApp y cinco funcionalidades |
| `img/` | Fotografías WebP, logotipo SVG, mapa SVG e imagen social |
| `fonts/` | Fuentes locales y sus licencias OFL |
| `docs/carta-presentacion-top-pasquel.pdf` | Carta de presentación descargable |
| `GUIA_COMPLETA.md` | Desarrollo en siete pasos con los tres archivos completos |
| `README.md` | Instrucciones, personalización y pruebas |
| `CREDITOS.md` | Procedencia de las fotografías y recursos |
| `robots.txt` | Directivas básicas para buscadores |
| `sitemap.xml` | URL principal del sitio |

En el proyecto de alojamiento, los archivos de la web se encuentran en `dist/`. El ZIP ya los organiza en su raíz para abrirlos directamente en Visual Studio Code.

## 3. HTML completo

El archivo `index.html` contiene el HTML completo, sin fragmentos pendientes. Utiliza `header`, `nav`, `main`, `section`, `article`, `figure` y `footer`.

Solo hay un H1. Los títulos de sección usan H2 y los servicios usan H3. Incluye metadatos, canonical, Open Graph, tarjeta social, favicon y datos estructurados `ProfessionalService` con la información proporcionada de la empresa.

Las imágenes tienen dimensiones y textos alternativos. Las fotografías secundarias usan `loading="lazy"`; la portada tiene `fetchpriority="high"` y variantes `srcset`.

## 4. CSS completo y responsive

`css/styles.css` contiene el CSS completo. Se organiza por secciones comentadas. Las variables de `:root` controlan colores, fuentes, ancho de contenido y espaciados.

La base es móvil. A partir de `40rem` se incorporan columnas de tableta; desde `64rem` aparece la navegación de escritorio y las cuadrículas de tres columnas. Flexbox organiza botones y navegación; Grid distribuye servicios, equipos y secciones.

El sitio incluye estados `hover`, foco de teclado visible, imágenes fluidas y reglas `prefers-reduced-motion`. Las fuentes están incluidas localmente: no se consulta Google Fonts durante la navegación.

## 5. JavaScript completo

`js/script.js` está separado y se carga con `defer`. Su estructura es:

| Función | Responsabilidad |
| --- | --- |
| `iniciarMenu()` | Abrir/cerrar el menú móvil y actualizar `aria-expanded` |
| `iniciarFiltros()` | Mostrar aplicaciones por categoría y anunciar el resultado |
| `iniciarAplicaciones()` | Abrir detalles de un servicio y preseleccionarlo al cotizar |
| `iniciarPreguntas()` | Mantener una sola respuesta desplegada |
| `iniciarCotizacion()` | Validar, generar vista previa y preparar WhatsApp o descarga TXT |
| `crearEnlaceWhatsApp()` | Codificar el mensaje y usar el destino configurado |
| `abrirDialogo()` / `iniciarCierreDialogos()` | Gestionar los diálogos compartidos |

Las ventanas usan `<dialog>`: el navegador gestiona la modalidad, el teclado y el cierre con Escape. Los datos del visitante se insertan con `textContent`, sin interpretar HTML.

### Configurar el WhatsApp comercial

Al inicio de `js/script.js` encontrarás:

```js
const CONFIGURACION = Object.freeze({
  whatsappNumero: ""
});
```

Reemplaza la cadena vacía por el número real de TOP PASQUEL: `51` seguido de los nueve dígitos del celular peruano, sin signo `+`, espacios ni guiones. Guarda y recarga el navegador.

Con un número válido, el botón flotante abre directamente el chat comercial y la cotización usa ese mismo destinatario. Mientras el campo esté vacío, el botón flotante conduce al formulario y el mensaje preparado abre el selector de destinatario de WhatsApp. No hay un número ficticio ni un contacto ajeno configurado.

### Comportamiento real del formulario

1. El visitante completa sus datos y el servicio.
2. El navegador valida los campos y muestra errores de texto junto a ellos.
3. Se presenta el mensaje completo para revisión.
4. El visitante decide compartirlo por WhatsApp o descargarlo como TXT.
5. El envío final lo realiza el visitante dentro de WhatsApp.

La confirmación dice que la solicitud está **preparada**, no enviada. El formulario no guarda datos en localStorage, cookies ni bases de datos. No se transmiten datos mientras se completa el formulario.

## 6. Cómo se relacionan los archivos

`index.html` enlaza `css/styles.css` mediante `<link rel="stylesheet">`. El CSS define la presentación de las clases del HTML y carga las fuentes desde `../fonts/`.

El HTML carga `js/script.js` con `defer`, por lo que el script se ejecuta después de analizar la estructura. JavaScript encuentra controles por ID, clase o atributos `data-*` y responde a eventos del visitante. Las clases `is-open` e `is-active`, los atributos `hidden` y los estados `aria-*` conectan comportamiento, diseño y accesibilidad.

Los enlaces relativos mantienen la web portable. Conserva las carpetas y sus nombres para que funcionen imágenes, estilos, JavaScript y PDF.

### Frontend frente a backend

| Funcionalidad | Estado |
| --- | --- |
| Navegación, filtros, detalles y preguntas | Funciona en el navegador |
| Validación y preparación de solicitud | Funciona en el navegador |
| Descargar solicitud TXT y carta PDF | Funciona en el navegador |
| Abrir WhatsApp con texto preparado | Funciona; requiere WhatsApp y un envío manual |
| Chat directo con TOP PASQUEL | Se activa al introducir el número comercial real |
| Guardar cotizaciones, enviar correos o integrar un CRM | Requiere backend o servicio externo; no está implementado |
| Confirmar recepción efectiva del mensaje | Requiere integración con el canal receptor; no está implementado |

La validación en frontend ayuda al visitante. Cuando se incorpore un servidor, también deberá validar y proteger los datos recibidos.

## 7. Ejecutar, probar y personalizar

### En Visual Studio Code y un navegador

1. Extrae el ZIP completo.
2. En Visual Studio Code, abre **Archivo > Abrir carpeta** y selecciona `top-pasquel-frontend`.
3. Abre `index.html` en Chrome, Edge o Firefox. Para esta web estática, puedes abrir el archivo directamente con doble clic.
4. Como alternativa, usa una extensión de servidor local como Live Server si ya la tienes. No es una dependencia del proyecto.
5. Guarda un cambio y recarga el navegador. No necesitas Node.js, npm ni un proceso de compilación.

Si ya tienes Python instalado, también puedes ejecutar `python -m http.server 8000` en la carpeta y abrir `http://localhost:8000/`. Python es solo una alternativa para servir archivos, no forma parte de la aplicación.

### Pruebas que puedes repetir

- En tamaños de móvil, abre el menú, navega a Servicios y verifica que se cierre.
- Prueba Todos, Topografía, Obras civiles y Territorio en la galería.
- Abre un caso, ciérralo con Escape y usa Cotizar este servicio.
- Abre dos preguntas: la anterior debe cerrarse.
- Intenta preparar un formulario vacío y revisa el foco en el primer error.
- Prueba un teléfono con letras y un correo sin formato válido.
- Completa los datos, autoriza compartirlos y revisa el mensaje preparado.
- Descarga la solicitud TXT. No uses datos personales reales en pruebas de demostración.
- Descarga la carta PDF y verifica su lectura.
- Navega con Tab, Enter, Espacio y Escape; verifica los indicadores de foco.
- En las herramientas del navegador, prueba anchos de 320, 375, 768, 1024 y 1366 píxeles.

### Personalización rápida

| Cambiar | Archivo o ubicación |
| --- | --- |
| Colores y tipografía | Variables `:root` y reglas `@font-face` de `css/styles.css` |
| Nombre, propuesta comercial y servicios | Textos de `index.html` |
| Número comercial de WhatsApp | `CONFIGURACION.whatsappNumero` en `js/script.js` |
| Casos e información de los diálogos | Objeto `aplicaciones` en `js/script.js` |
| Fotografías | Archivos de `img/`; actualiza también `alt`, dimensiones y créditos |
| Logo | `img/isotipo-top-pasquel.svg` y marca textual del encabezado |
| Carta comercial | Sustituye el PDF conservando el nombre o actualiza sus dos enlaces |
| Dominio definitivo | Canonical, Open Graph, JSON-LD, `robots.txt` y `sitemap.xml` |
| Redes sociales | Agrega únicamente enlaces oficiales confirmados |

El canonical y los metadatos absolutos ya apuntan al alojamiento de esta entrega. Si migras a un dominio propio, actualiza todas esas referencias. El acceso privado del alojamiento debe pasar a público antes de usarlo como web comercial indexable.

La guía `GUIA_COMPLETA.md` reproduce íntegros HTML, CSS y JavaScript en ese orden. Los archivos fuente son los mismos que usa la web.
