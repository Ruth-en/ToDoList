import { addTaskToBacklogApi, getBacklogApi, getTareasBacklogApi, removeTaskFromBacklogApi } from "../http/backlogService";
import { storeBacklogSlice } from "../store/backlogSlice";

export const useBacklog = () => {
    const { backlog, tareasBacklog, setBacklog, setTareasBacklog,  removerTareaDelBacklog } = storeBacklogSlice();

    //Traer el backlog
    const getBacklog = async () => {
        try {
            const elBacklog = await getBacklogApi();
            if (elBacklog) { setBacklog(elBacklog) }
        } catch (error) {
            console.error("Error al obtener el backlog:", error);
        }
    };

    //Traer las tareas del backlog
    const getTodasTareasBacklog = async () => {
        try {
            const todasTareas = await getTareasBacklogApi();
            if (todasTareas) { setTareasBacklog(todasTareas); }
        } catch (error) {
            console.error("Error al obtener tareas del backlog:", error);
        }
    }; 

    //añadir una tarea al backlog
    const añadirTareaAlBacklog = async (idTarea: string) => {
        try {
            await addTaskToBacklogApi(idTarea);
            setTareasBacklog(tareasBacklog) // Refresca tareas reales del backend
        } catch (error) {
            console.error("Error al añadir una tarea al backlog:", error);
        }
    }
    
    //quitar una tarea del backlog
    const quitarTareaDelBacklog = async(idTarea: string) => {
        try {
            await removeTaskFromBacklogApi(idTarea)
            removerTareaDelBacklog(idTarea) // Vuelvo a refrescar
        } catch (error) {
            console.error("Error al remover una tarea al backlog:", error);
        }
    }
    return {
        backlog,
        tareasBacklog,
        getBacklog,
        getTodasTareasBacklog,
        añadirTareaAlBacklog,
        quitarTareaDelBacklog
    }
}
