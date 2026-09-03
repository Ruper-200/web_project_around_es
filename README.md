# Around The U.S.

## Descripción

Around The U.S. es una aplicación web interactiva que permite a los usuarios
gestionar su perfil y compartir tarjetas con fotografías de diferentes lugares.

El proyecto está desarrollado con TypeScript y utiliza Programación Orientada
a Objetos (POO) para organizar la lógica de la aplicación en componentes
independientes y reutilizables.

En esta etapa del proyecto se integró una API REST para obtener y almacenar
los datos del usuario y las tarjetas en un servidor, permitiendo que los
cambios realizados en la aplicación persistan después de recargar la página.

## Funcionalidades

- Obtención de la información del usuario desde el servidor.
- Obtención y renderizado de las tarjetas almacenadas en el servidor.
- Edición del nombre y la ocupación del usuario.
- Actualización de la imagen de perfil del usuario.
- Creación de nuevas tarjetas con nombre e imagen.
- Eliminación de tarjetas propias mediante un popup de confirmación.
- Sistema de "Me gusta" y "No me gusta" conectado con el servidor.
- Persistencia de los cambios mediante una API REST.
- Vista ampliada de las imágenes mediante un popup.
- Cierre de popups mediante el botón de cierre, la tecla `Escape` o haciendo
  clic fuera del contenido.
- Validación de formularios antes de enviar información.
- Estados de carga mediante el texto `Guardando...` durante las solicitudes
  al servidor.
- Manejo de errores en las solicitudes realizadas a la API.

## Integración con la API

La aplicación se comunica con una API REST para obtener y modificar la
información almacenada en el servidor.

Las principales operaciones implementadas son:

- `GET` para obtener la información del usuario y las tarjetas iniciales.
- `PATCH` para actualizar la información y el avatar del usuario.
- `POST` para crear nuevas tarjetas.
- `PUT` para agregar "Me gusta" a una tarjeta.
- `DELETE` para eliminar "Me gusta" y eliminar tarjetas.

Las solicitudes HTTP están centralizadas en la clase `Api`, evitando realizar
peticiones directamente desde otros componentes de la aplicación.

La aplicación utiliza `async/await` para trabajar con las operaciones
asíncronas y comprueba las respuestas HTTP antes de utilizar los datos
devueltos por el servidor.

## Tecnologías y técnicas utilizadas

- HTML5.
- CSS3.
- Diseño responsivo.
- Metodología BEM para la organización de estilos CSS.
- TypeScript.
- JavaScript ES6+.
- Programación Orientada a Objetos (POO).
- Manipulación del DOM.
- API REST.
- Fetch API.
- Promesas.
- `async/await`.
- Manejo de errores con `try...catch`.
- Validación de formularios.
- Git y GitHub para control de versiones.

## Arquitectura

La aplicación está organizada mediante clases con responsabilidades
específicas.

### `Api`

Centraliza la comunicación entre la aplicación y el servidor. Gestiona las
solicitudes relacionadas con usuarios, tarjetas, likes y avatar.

### `Card`

Representa una tarjeta individual y administra su comportamiento, incluyendo
la visualización de la imagen, los likes y la eliminación.

### `Section`

Administra el renderizado de elementos dentro de un contenedor.

### `FormValidator`

Gestiona la validación de los formularios y el estado de sus botones de envío.

### `Popup`

Clase base que contiene el comportamiento común de los popups.

### `PopupWithImage`

Extiende `Popup` y permite mostrar una imagen en tamaño ampliado.

### `PopupWithForm`

Extiende `Popup` y administra los formularios utilizados dentro de los popups.

### `PopupWithConfirmation`

Extiende `Popup` y gestiona la confirmación antes de eliminar una tarjeta.

### `UserInfo`

Administra la información mostrada en el perfil del usuario, incluyendo nombre,
ocupación y avatar.

## Flujo de datos

La información obtenida desde los formularios se envía a la API y la interfaz
se actualiza utilizando la respuesta del servidor.

Ejemplo de creación de una tarjeta:

Formularios → API → Servidor → Respuesta → DOM

De esta manera, el servidor funciona como la fuente de verdad de los datos y
los cambios permanecen disponibles después de recargar la aplicación.

## Compilación

El código fuente TypeScript se encuentra dentro del directorio `src`.

Para compilar el proyecto se utiliza el compilador de TypeScript:

```bash
tsc
```
