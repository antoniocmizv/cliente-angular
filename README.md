# Documentación del Cliente Angular para Juego Multijugador

## Descripción General
Este proyecto es un cliente Angular que implementa una interfaz gráfica para un juego multijugador basado en turnos.
El juego permite a varios jugadores conectarse a un servidor mediante WebSockets para jugar en un entorno interactivo.

## Arquitectura del Proyecto
- Cliente Angular organizado en módulos.
- Comunicación en tiempo real vía WebSockets.
- Gestión de estados y ruteo con Angular Router.
- Interfaz gráfica responsiva adaptada a distintos dispositivos.

## Requisitos
- Node.js (versión LTS recomendada)
- Angular CLI
- Dependencias definidas en package.json

## Instalación
```bash
npm install
```

## Ejecución
```bash
ng serve
```
Abrir en el navegador: http://localhost:4200/

## Tecnologías Utilizadas
- Angular
- TypeScript
- HTML/CSS
- WebSockets

## Contribuciones
- Clonar el repositorio.
- Crear ramas para nuevas funcionalidades o corrección de errores.
- Realizar pull requests para integrar cambios.

## Licencia
Distribuido bajo la licencia MIT.

## Tecnologías Utilizadas
- Angular – Framework para la creación de aplicaciones web.
- TypeScript – Lenguaje que añade tipado estático a JavaScript.
- HTML/CSS – Estructura y estilos de la interfaz de usuario.
- WebSockets – Comunicación en tiempo real entre el cliente y el servidor.

## Componentes y Funcionalidades Principales
1. AppComponent
Es el componente raíz que inicializa la aplicación y establece la conexión inicial con el servidor de WebSockets.

2. GameBoardComponent
Encargado de mostrar el tablero de juego y gestionar las interacciones del usuario. Se encarga de inicializar la interfaz gráfica y renderizar el estado del juego.


## Servicios
# GameConnectionService
Administra la comunicación con el servidor mediante WebSockets. Se encarga de:

Establecer la conexión al servidor.
Enviar eventos y acciones del usuario (movimientos, rotaciones, disparos).
Recibir actualizaciones en tiempo real del estado del juego


## Clases de Ayuda
# GameService
Gestiona el estado interno del juego y procesa los eventos que provienen del servidor. Entre sus responsabilidades:

- Definir y gestionar los estados del juego: WAITING, PLAYING, ENDED.
- Manejar la incorporación de nuevos jugadores y la actualización del estado del juego.
- Coordinar la actualización de la interfaz gráfica a través de la clase Ui.


# Ui
Se encarga de la representación gráfica del juego, es decir, de renderizar el tablero, los controles y la información relevante (como mensajes de fin de partida).


## Flujo de Datos
# Acciones del Usuario: 
- El usuario realiza acciones (mover, rotar, disparar).
- Captura de Eventos: Las acciones se capturan en la interfaz gráfica gestionada por la clase Ui.
- Comunicación: Los eventos se envían al servidor a través del GameConnectionService.
- Procesamiento del Servidor: El servidor procesa las acciones y envía el nuevo estado del juego.
- Actualización: GameConnectionService delega la actualización a GameService, que actualiza el estado local.
- Renderizado: Se vuelve a renderizar la UI con los datos actualizados del juego.
