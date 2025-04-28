import { ITarea } from "../types/ITarea";
import { storeTareasSlice } from "../store/tareasSlice";
import { crearTareaApi, deleteTareaApi, editTareaApi } from "../http/taskService";


export const useTareas = () => {
     const {
          tasks,
          createTask,
          editTask,
          deleteTask,
     } = storeTareasSlice();


     const crearTarea = async (newTarea: ITarea) => {
          try {
               const añadirTarea = await crearTareaApi(newTarea);
               if (añadirTarea) { createTask(añadirTarea) }
               return añadirTarea;
          } catch (error) {
               console.error('Error al agregar una tarea al backlog:', error);
               throw error;
          }
     };

     const modificarTarea = async (tarea: ITarea) => {
          try {
               const editarTarea = await editTareaApi(tarea._id, tarea);
               if (editarTarea) { editTask(editarTarea) }
          } catch (error) {
               console.error('Error al editar tarea del backlog:', error);
               throw error;
          }
     };

     const eliminarTarea = async (idTarea:string)=>{
          try {
               await deleteTareaApi(idTarea);
               deleteTask(idTarea)
          } catch (error) {
               console.error('Error al eliminar tarea del backlog:', error);
               throw error;
          }

     };

     return {
          tasks,
          crearTarea,
          modificarTarea,
          eliminarTarea
     };
};
