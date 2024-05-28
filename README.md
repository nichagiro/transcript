# React + TypeScript + Vite
Aplicacion creada con estas tecnologias usando _NODE 20.11.1_ 

## APP Principal
Tiene como funcionalidad trasncribir + escribir en un campo de texto y guardar el resultado en BD

- NextUI (Componentes unitarios)
- Fecth API
- SpeachReconigtion API (google record)

### Utilidad para IE7 con HTML4
El archivo de configuracion se encuentra en la carpeta public/ie7 es un archivo compatible para esta version.

- Tiene la funcionalidad de abrir la aplicacion principal apartir del window.open()

#### Requisitos

- vincular el script en el html4 correspondien te:  <script src= "http://coimbandev05/siam/siamplus/Transcripcion/ie7.js"></script>
- un input con el valor del loginName: <input value="NC2506" id="IdUsuario" />
- un elemento clickleable como el boton, especificamente con el id *btn-transcription* <button id="btn-transcription" class="siamButton">Transcribir</button>