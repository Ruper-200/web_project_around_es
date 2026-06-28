# Around The U.S.

## Descripcion

Around The U.S. es una galeria web interactiva en la que el usuario puede editar
su perfil, agregar y eliminar fotografias, marcar tarjetas como favoritas y abrir
las imagenes en una vista ampliada.

La interfaz es responsiva y los formularios muestran mensajes de validacion antes
de permitir el envio de datos.

## Funcionalidades

- Edicion del nombre y la ocupacion del usuario.
- Creacion y eliminacion de tarjetas con fotografias.
- Boton de Me gusta para cada tarjeta.
- Vista ampliada de las imagenes en ventanas modales.
- Cierre de modales mediante boton, clic en el fondo o tecla Escape.
- Validacion visual y universal de formularios.

## Tecnologias y tecnicas

- HTML5 y CSS3.
- Diseno responsivo con Flexbox, Grid y media queries.
- Metodologia BEM para organizar los estilos.
- TypeScript estricto y modulos ES.
- Programacion orientada a objetos.
- Encapsulamiento, herencia, clases genericas e interfaces tipadas.
- Manipulacion del DOM y eventos del navegador.
- Git y GitHub para control de versiones.

## Arquitectura

El codigo fuente TypeScript se encuentra en `src` y el compilador genera los
archivos JavaScript que usa el navegador dentro de `public`.

Cada clase tiene una responsabilidad concreta:

- `Card`: crea las tarjetas y controla sus interacciones.
- `Section`: renderiza colecciones dentro de un contenedor.
- `FormValidator`: valida los formularios.
- `Popup`: contiene el comportamiento comun de las ventanas modales.
- `PopupWithImage`: muestra una imagen y su leyenda.
- `PopupWithForm`: procesa y reinicia formularios dentro de un modal.
- `UserInfo`: lee y actualiza la informacion del perfil.

## Compilacion

```bash
tsc
```

El punto de entrada es `src/scripts/index.ts` y su resultado compilado es
`public/scripts/index.js`.
