# Bitácora — Página Fundación Cultural Sankofa

**Proyecto:** Rediseño del sitio web de la Fundación Cultural Sankofa
**Carpeta:** `/home/deivis/Escritorio/Proyectos/Página Sankofar`
**Fecha de trabajo:** 05 de septiembre de 2026

---

## 1. Contexto

Se rediseñó por completo la página web de la Fundación Cultural Sankofa (Cumbal, Nariño, Colombia), que trabaja el patrimonio arqueológico del Nudo de los Pastos con comunidades originarias. Todo el contenido y las imágenes se tomaron del contexto real de la organización, provisto por dos presentaciones institucionales.

## 2. Fuentes de contexto e imágenes

- `1. Fundación Sankofar_presentación general.pptx` (escritorio)
- `2. Fundación Sankofar_presentación Septiembre 2025.pptx` (escritorio)

De estos archivos se extrajo el contenido completo (misión, visión, propósito, objetivos, valores, enfoque, territorio, proyectos, alianzas, revista) mediante `python-pptx`, y se extrajeron/identificaron las imágenes usadas en la web (incluido el logo).

Herramienta (venv reutilizable): `/tmp/opencode/pptxenv` · imágenes crudas: `/tmp/opencode/pptx/view/`

## 3. Skills de opencode instaladas (globales)

- `frontend-design` (Anthropic) → `~/.agents/skills/frontend-design/SKILL.md`
- `impeccable` v4.2.0 (auditoría/UI) → `~/.config/opencode/skills/impeccable/`
- Detector: `~/.config/opencode/skills/impeccable/scripts/impeccable detect <archivos>` (salida `--json` opcional)

> Requiere reiniciar opencode para que las skills queden disponibles.

## 4. Concepto de diseño

**"Cuaderno de campo arqueológico"**: estética editorial y documental, coherente con la identidad de una fundación patrimonial.

- **Tipografías:** Fraunces (display serif) · Work Sans (texto) · JetBrains Mono (etiquetas, dígitos).
- **Paleta:** azul petróleo, coral, dorado y turquesa (muestreados del logo oficial). Jerarquía de marca: Dorado → Coral → Azul petróleo; turquesa y aqua solo como detalle/acento.
- **Logo plano:** sin degradados de marca; los degradados de fondo son neutros, derivados de los tokens de petróleo.

### Tokens de color (styles.css)

| Token | Valor | Uso |
|---|---|---|
| `--pine-900` | `#02222d` | Fondo base, texto sobre coral/dorado |
| `--pine-800` | `#032f3d` | Fondos alternos, bloques |
| `--pine-700` | `#044054` | Bloques secundarios |
| `--pine-600` | `#0a5a72` | Azul petróleo de apoyo |
| `--moss` | `#03BEBF` | Turquesa de detalle |
| `--terracotta` | `#FD5D44` | Coral de marca, CTA |
| `--terracotta-ink` | `#b83a25` | Coral oscuro (contraste) |
| `--clay` | `#FD5D44` | Coral en iconos/acentos |
| `--clay-soft` | `#fe8f7d` | Coral claro sobre oscuro |
| `--gold` | `#FDBF21` | Dorado de marca |
| `--gold-soft` | `#fed667` | Dorado claro sobre oscuro |
| `--gold-deep` | `#8a6600` | Dorado oscuro (contraste) |
| `--sand` | `#02222d` | Sección base |
| `--sand-2` | `#032f3d` | Sección alterna |
| `--sand-bright` | `#eef1e6` | Texto sobre oscuro |
| `--ink` | `#eef1e6` | Texto principal |
| `--ink-soft` | `rgba(238,241,230,.82)` | Texto secundario |
| `--ink-faint` | `rgba(238,241,230,.58)` | Etiquetas |
| `--aqua` | `#90E8EA` | Aqua claro de apoyo (detalles) |
| `--glass` | `rgba(2,34,45,.52)` | Paneles translúcidos |
| `--glass-strong` | `rgba(2,34,45,.66)` | Paneles translúcidos fuertes |

## 5. Estructura de la página

`index.html` — 11 secciones + footer:

1. **inicio** — hero con logo/ave Sankofa, manifiesto breve, hechos y marquesina
2. **manifiesto** — "Un nombre que es también un método de trabajo"
3. **rumbo** — misión, visión y propósito
4. **objetivos** — 5 objetivos guía
5. **principios** — valores del trabajo de campo
6. **enfoque** — qué hacemos, para quién y por qué
7. **territorio** — páramo andino (contexto STEP) con foto a sangre completa
8. **proyectos** — 6 proyectos con imagen
9. **resultados** — métricas y cifras
10. **alianzas** — resguardos, instituciones y aliados
11. **contacto** — CTA, datos y formulario (enlace a correo)

## 6. Archivos del sitio

| Archivo | Descripción |
|---|---|
| `index.html` | Página completa (semántico, accesible, 11 secciones) |
| `styles.css` | Sistema de diseño completo, responsive (≤1024/960/720px), `prefers-reduced-motion` |
| `script.js` | Año dinámico, header al scroll, menú móvil, barra de progreso (`scaleX`), reveal, nav activo, back-to-top |
| `assets/img/logo.png` | Logo (ave Sankofa) a fondo transparente, 676×754 |
| `assets/img/logo-luz.png` | Variante clara para fondos oscuros |
| `assets/img/favicon.png` / `favicon-180.png` | Favicons |
| `assets/img/*.jpg` | 10 imágenes optimizadas (territorio, proyectos, alianzas, revista) |

## 7. Control de calidad

- **Validador HTML:** sin errores de estructura; todos los enlaces del nav tienen destino existente.
- **JS:** `node --check` correcto; sin referencias huérfanas.
- **Render headless (Chromium):** sin errores de consola, sin imágenes 404; paleta y estructura confirmadas por muestreo de píxeles.
- **Impeccable detect:** 49 → 21 hallazgos. Restantes: falsos positivos por capas translúcidas/gradientes (pares de bajo contraste contra fondos mezclados) y patrones de diseño intencionales (marquesina, curvas de nivel en gradiente repetido, fondo crema de marca, Fraunces como display, mayúsculas en etiquetas mono).

### Correcciones aplicadas tras auditoría

- Coral `#FD5D44`, dorado `#FDBF21`, tintas de texto rebalanceadas.
- Hover de botón primario y back-to-top más oscuros.
- Bordes laterales gruesos de tarjetas (3px) reducidos a 1px.
- Barra de progreso y subrayado del nav con `transform` (no `width`).
- Etiquetas mono de datos ≥ 0.72rem; `contact-note` 0.78rem.
- Etiquetas de sección sin prefijo numérico.
- Sub-marca del header al hacer scroll en `--gold-deep` (contraste AA sobre fondo claro).
- Opacidad del hero-bird reducida en móvil (0.55) para no competir con el texto.

## 8. Pendientes para el usuario

- [ ] Revisar visualmente las fotos (extractadas de las presentaciones; no verificadas a ojo).
- [ ] Sustituir teléfono de contacto (`+57 300 000 0000`) por el real.
- [ ] Confirmar/adicionar canales reales (correo institucional, redes) en `#contacto` y el footer.
- [ ] Publicar el sitio (recomendado: GitHub Pages para porfolio/documento o un hosting propio).
- [ ] Reiniciar opencode para cargar las skills.
- [ ] Arreglar el `is-active` del nav en secciones altas (ver §10).
- [ ] Decidir si se extiende `data-reveal` a títulos, textos e imágenes (ver §10).

## 9. Ajuste final: marquesina continua + paleta oscura global

### Marquesina (bucle infinito real)
- **Causa raíz del "salto":** el grupo de 6 palabras medía ~938 px, menos que el contenedor (1440 px). En el tramo final del ciclo, la ventana visible superaba el final del track: ~500 px de banda terracota VACÍA a la derecha hasta que el loop reiniciaba y el texto "aparecía de golpe".
- **Fix:** cada `.marquee-group` repite el bloque (6 palabras + ✦) 3 veces → grupo ≈ 2815 px ≥ viewport hasta 2560 px. Dos grupos idénticos, track = 2×, `@keyframes` `from 0 → to -50%` (el -50% = ancho exacto de un grupo). Se añadió `transform: translateZ(0)` inicial para evitar flash de compositor.
- **Verificado** en 1440/1024/960/720/390: decremento lineal frame a frame sin micro-saltos, exactamente 1 wrap por ciclo en `-grupo`, cobertura 24/24 columnas en cada frame (cero huecos).

### Paleta oscura (coherencia total con el hero)
- Tokens: `--sand #02222d` (sección base), `--sand-2 #032f3d` (alterna), textos claros `--ink #eef1e6` (+ translúcidos claros), líneas hairline claras, nuevo token `--glass` para tarjetas.
- Secciones con gradiente pino-900/800 + resplandores dorado/terracota sutiles y stipple claro; sin `overflow:hidden` en `.section` (preserva el sticky).
- Header con scroll → cristal oscuro `rgba(2,34,45,0.85)` con texto claro (se eliminaron las inversiones claras).
- Tarjetas (misión/valores/enfoque/contexto/proyectos/estadísticas) → paneles `--glass` con blur y bordes hairline, misma familia que el CTA.
- Acentos pequeños (`hero-facts dt`, `contact-label`, `approach-q`, números, etiquetas) → `gold-soft`/`clay-soft`; terracota solo en rellenos y acentos grandes. Glow del botón CTA → sombra neutra.
- **Contraste AA verificado:** títulos `#eef1e6` / pino ≈ 14.5:1; párrafos ≈ 11:1; `gold-soft` ≈ 9.8:1; `clay-soft` ≈ 7.3:1.

### Control de calidad final
- Render headless: sin errores de consola ni imágenes 404; altura 11449 px.
- `node --check` OK; HTML balanceado.
- **Impeccable detect: 21 → 6 hallazgos** (desaparecieron todos los low-contrast y el dark-glow). Restantes: marquesina (pedida por el usuario), padding del ribbon, Fraunces, 51 caracteres en mayúsculas (etiquetas), contornos repetidos (advisory) — intencionales.

## 10. Animaciones: diagnóstico y corrección (02 de octubre de 2026)

**Síntoma:** ninguna animación ni transición se ejecutaba en el navegador (marquesina quieta, ave sin respiración, reveal sin aparecer). El código de `styles.css` y `script.js` era correcto y nunca se modificó.

### Causa raíz
- El escritorio es **Cinnamon** (`XDG_CURRENT_DESKTOP=X-Cinnamon`), con `org.cinnamon.desktop.interface enable-animations = false`.
- Con esa clave en `false`, **Brave** reportaba `matchMedia('(prefers-reduced-motion: reduce)').matches === true`.
- El bloque `@media (prefers-reduced-motion: reduce)` de `styles.css` (líneas 54-61) colapsa **todas** las animaciones y transiciones a `0.001ms !important` con `iteration-count: 1`. Resultado: `marquee` y `bird-breathe` con duración `1e-06s` congelados, reveal con `transition-duration` nula. No era un bug del sitio.

### Fix
```
gsettings set org.cinnamon.desktop.interface enable-animations true
```
**No** tocar `org.gnome.desktop.interface enable-animations`: esa clave es de compatibilidad GNOME, existe en Cinnamon, pero no es la que se lee. Se modificó por error durante el diagnóstico y se restauró a `false`.

### Por qué el diagnóstico automático no lo detectaba
- Chromium de Playwright (build 141, el que se usó para el resto de controles de calidad) consulta en Linux únicamente el **portal XDG** (`org.freedesktop.portal.Settings`), que no está instalado en Cinnamon. Por eso reportaba `reduce-motion=false` con las dos claves en `false`, y por eso parecía que "todo funcionaba".
- El navegador del usuario (Brave 154) sí lo detecta. **Regla para futuros diagnósticos:** medir el navegador real del usuario, no un Chromium limpio, cuando el síntoma sea del entorno.
- Sin `xdg-desktop-portal` en el sistema, ningún motor Chromium nuevo puede heredar `prefers-reduced-motion` del escritorio.

### Verificación
- Barra de diagnóstico verde temporal inyectada en `index.html` y leída por OCR sobre la ventana real de Brave (`import -window` + `tesseract`), antes y después:

| | antes | después |
|---|---|---|
| `reduce-motion` | `true` | `false` |
| marquesina | `marquee 1e-06s` | `marquee 30s` |
| ave hero | `bird-breathe 1e-06s` | `bird-breathe 7s` |

- Dos capturas de la ventana de Brave separadas 1 s difieren en **13 353 píxeles** (banda de la marquesina + hero): movimiento real confirmado.
- La barra de diagnóstico se eliminó de `index.html` tras la verificación.

### Hallazgo lateral: cobertura del reveal
- `data-reveal` está en **27 elementos**, casi todos tarjetas (`mvp-card`, `timeline-item`, `value-card`, `approach-card`, `context-card`, `featured-card`, `project-card`, `revista-frame`).
- **No tienen reveal** (aparecen de golpe): `h2.section-title` × 9, `.section-intro` × 3, `.hero-title`, `.hero-lede`, `.terrain-stats`, `.ally-photos`, `.quote-rule`, `.contact-card`, `.cta-band`.
- Si se quiere que "toda la página" entre animada al hacer scroll, falta añadir `data-reveal` a esos bloques (y una entrada para el hero). No implementado: el usuario no lo pidió.

### Bug menor abierto
- El resaltado del nav (`is-active`) se queda vacío en secciones altas: el `IntersectionObserver` de `script.js` usa `threshold: 0.4`, imposible de alcanzar en secciones más altas que el viewport (el documento mide 11 449 px). **Fix propuesto:** `threshold: 0` con `rootMargin` negativo, o seleccionar la sección cuyo top esté más cerca del borde superior. Pendiente de confirmación del usuario.

## 11. Alineación de la paleta con el logo oficial (02 de noviembre de 2026)

Se alineó el color del sitio con los valores muestreados del logo PNG oficial. No se modificaron estructura, textos, tipografías ni layout. El logo es plano: no se añadieron degradados de marca.

### Tokens actualizados en `styles.css` (`:root`, líneas 14-51)

| Token | Antes (rol) | Después |
|---|---|---|
| `--pine-900` | verde pino profundo | `#02222d` |
| `--pine-800` | verde pino secundario | `#032f3d` |
| `--pine-700` | verde pino de bloque | `#044054` |
| `--pine-600` | verde-teal de apoyo | `#0a5a72` |
| `--moss` | verde musgo | `#03BEBF` |
| `--terracotta` | terracota | `#FD5D44` |
| `--terracotta-ink` | terracota oscura | `#b83a25` |
| `--clay` | arcilla | `#FD5D44` |
| `--clay-soft` | arcilla clara | `#fe8f7d` |
| `--gold` | dorado antiguo | `#FDBF21` |
| `--gold-soft` | dorado claro antiguo | `#fed667` |
| `--gold-deep` | dorado profundo | `#8a6600` |
| `--sand` | arena oscura | `#02222d` |
| `--sand-2` | arena oscura alterna | `#032f3d` |
| `--aqua` | — | `#90E8EA` (nuevo) |

`--sand-bright`, `--ink`, `--ink-soft` y `--ink-faint` se conservaron sin cambios.

### Colores hardcodeados y ajustes de contraste

| Archivo · línea(s) | Antes (rol) | Después |
|---|---|---|
| `index.html:8` | petróleo/verde pino oscuro | `#02222d` |
| `styles.css:39-40` (`--glass`, `--glass-strong`) | verde pino translúcido | `rgba(2,34,45,.52/.66)` |
| `styles.css:128, 844-845, 853, 1246, 1300` | verde pino translúcido | `rgba(2,34,45,…)` |
| `styles.css:240, 453, 1084` | naranja terracota translúcido | `rgba(253,93,68,…)` |
| `styles.css:241, 266, 363, 454, 504-506, 513-514, 653, 724, 854, 982, 1085` | dorado antiguo translúcido | `rgba(254,214,103,…)` |
| `styles.css:660` | arcilla clara translúcida | `rgba(254,143,125,.45)` |
| `styles.css:416` | verde oscuro translúcido | `rgba(2,34,45,.14)` |
| `styles.css:455` | gradiente verde pino | `var(--pine-800) / var(--pine-900)` |
| `styles.css:551-553` (`.btn-primary`) | texto `--sand-bright` sobre coral | texto `--pine-900` (AA 5.38:1) |
| `styles.css:414-417, 442` (`.marquee`) | texto claro sobre coral | texto `--pine-900` (AA 5.38:1) |
| `styles.css:1238` (`.back-to-top`) | texto `--sand-bright` sobre coral | texto `--pine-900` (AA 5.38:1) |
| `styles.css:509` (`.tag::before`) | heredaba dorado | punto aqua `var(--aqua)` (detalle) |
| `styles.css:696-701` (`.timeline-index::before`) | línea dorada | línea turquesa `var(--moss)` (detalle) |
| `styles.css:1172` (`.contact-note`) | `rgba(250,246,234,.45)` (4.08:1) | `rgba(250,246,234,.55)` (5.47:1) |
| `styles.css:1223` (`.footer-legal`) | `rgba(250,246,234,.4)` (3.52:1) | `rgba(250,246,234,.55)` (5.47:1) |

`script.js` no contenía colores hardcodeados; no requirió cambios.

### Jerarquía y uso del color
- Azul petróleo (`--pine-*`) como base de fondos y texto sobre coral/dorado.
- Dorado (`--gold-soft`) en títulos de acento, etiquetas y cifras.
- Coral (`--terracotta` / `--clay-soft`) en CTA, rellenos y destacados.
- Turquesa/aqua (`--moss`, `--aqua`) solo en detalles pequeños (punto de etiqueta, iconos y hover).
- Sin bloques grandes de texto sobre coral/dorado; los CTA usan petróleo oscuro para asegurar AA.

### Verificación
- Render headless con Chromium (Playwright): **0 errores de consola, 0 peticiones fallidas, 0 respuestas ≥400**.
- Capturas: `capturas/paleta-desktop.png` (1440 px) y `capturas/paleta-mobile.png` (390 px).
- Grep final de los hex antiguos del paso 2: sin coincidencias en `index.html`, `styles.css` ni `script.js`.
- Contraste AA comprobado en los pares principales: texto `--ink` / `--pine-900` 14.46:1; `--gold-soft` / `--pine-900` 11.84:1; `--clay-soft` / `--pine-900` 7.44:1; `--aqua` / `--pine-900` 11.75:1; `--pine-900` / coral 5.38:1.

---
*Bitácora interna de desarrollo — Fundación Cultural Sankofa.*