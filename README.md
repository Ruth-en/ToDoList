# Administrador de Tareas (ToDoList)

Este proyecto es una aplicación web de **Administrador de Tareas** (ToDoList) desarrollada con **React**. Permite a gestionar sus tareas diarias de manera sencilla: crear, editar, cambiar de estado y eliminar tareas, así como organizarlas en sprints de trabajo.

## Características principales

- Crear nuevas tareas
- Editar el contenido de una tarea
- Eliminar tareas
- Cambiar el estado de las tareas (Pendiente, En progreso, Completada)
- Organizar tareas en sprints
- Mover tareas al Backlog

## Tecnologías utilizadas

- **React** – Librería para construir interfaces de usuario
- **Zustand** – Manejo de estado global
- **Axios** – Cliente HTTP para consumir APIs
- **Express** (backend) – Servidor para la gestión de datos
- **MongoDB** – Base de datos NoSQL para almacenamiento de tareas y sprints

## Estructura del proyecto

src/
  assets/         # Contiene imágenes y otros recursos estáticos.
  components/     # Componentes de interfaz de usuario reutilizables.
  screens/        # Vistas o páginas principales de la aplicación.
  hooks/          # Hooks personalizados para lógica reutilizable.
  http/           # Servicios para la comunicación con el backend.
  routes/          # Define las rutas de navegación de la aplicación.
  store/           # Contiene la lógica de manejo de estado.
  types/           # Define las interfaces y tipos de datos utilizados en la aplicación.
...
package.json      # Información sobre las dependencias y scripts del proyecto.
...

## Instalación y configuración

1. Clona el repositorio:
   
   ```bash
   git clone https://github.com/Ruth-en/ToDoList
   ```
2. Instala las dependencias:
```
npm install
```
3. Inicia la aplicación React:
```
npm run dev
```
