# Sinergia Holística — Landing Page

Landing page de una sola página para Sinergia Holística: acompañamiento humano, terapéutico, espiritual y tecnológico desde Chile (hipnosis, terapia regresiva, visualización y sonido).

## Estructura

```
index.html       Estructura y contenido de la página (una sola vista, scroll vertical)
css/styles.css   Paleta, tipografía, layout, animaciones
js/main.js       Menú móvil, scroll-reveal, campo estelar (13 estrellas doradas ocultas),
                 marcas del cosmograma, reproductores de audio/vídeo (interfaz), formulario
```

No requiere build ni dependencias: es HTML/CSS/JS plano. Para verla localmente:

```
python3 -m http.server 8000
```

y abrir `http://localhost:8000`.

## Placeholders pendientes de completar con datos reales

Buscar en `index.html`:

- `[Nombre]` — nombre del terapeuta/creador (sección "Sobre mí")
- `[Formación]`, `[Experiencia]`, `[Modalidad]` — sección "Sobre mí"
- `[WhatsApp]` — número para el enlace `wa.me/`
- `[Email]` — correo de contacto (botón y `mailto:`)
- `[Enlace de reserva]` — enlace a sistema de reservas (footer)
- `[Redes sociales]` — enlaces a Instagram / YouTube (footer)

## Audio y vídeo

Los reproductores de audio y las miniaturas de vídeo están construidos como interfaz (forma de onda animada, botón de reproducción, overlays) pero **no incluyen archivos reales todavía**. Al interactuar con ellos se muestra un aviso de que el contenido está en preparación, tal como indica el texto de la sección: *"Algunos audios están en desarrollo o se generan con voz de alta fidelidad al servicio de la experiencia humana."*

Cuando existan los archivos definitivos:

- Sustituir la lógica de `data-play` en `js/main.js` por un elemento `<audio>` real controlado desde JS.
- Sustituir `data-video-play` por un reproductor de vídeo embebido (archivo propio o plataforma externa).

## Formulario de contacto

El formulario (`#contact-form`) valida en el cliente y muestra los mensajes de éxito/error definidos en el copy original. No envía datos a ningún backend todavía: conectar `js/main.js` (evento `submit`) a un endpoint real, servicio de formularios o `mailto:` según se decida.

## Enfoque ético

Los textos respetan el enfoque ético definido para la marca: la hipnosis se presenta como atención focalizada (nunca pérdida de control), la terapia regresiva como exploración simbólica/emocional (nunca verdad histórica absoluta), la IA como apoyo y nunca sustituto del acompañamiento humano, y no se prometen resultados garantizados. Evitar alterar estos textos sin mantener ese mismo cuidado.
