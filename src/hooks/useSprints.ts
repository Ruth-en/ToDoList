import { addSprintApi, addTaskToSprintApi, deleteSprintApi, editSprintApi, getListaSprintApi, getSprintByIdApi, removeTaskFromSprintApi } from "../http/sprintService";
import { ISprint } from "../types/ISprint";
import { storeSprintSlice } from "../store/sprintSlice";
import { useTareas } from "./useTareas";


export const useSprints = () => {
    const {
        listaSprints,
        activeSprint,
        getSprint,
        setAllSprint,
        addSprint,
        editSprint,
        deleteSprint,
    } = storeSprintSlice();

    const {
        eliminarTarea
    } = useTareas();

    const getTodosLosSprint = async () => {
        try {
            const todosLosSprint = await getListaSprintApi();
            if (todosLosSprint) { setAllSprint(todosLosSprint); }
        } catch (error) {
            console.error("Error al obtener el sprint:", error);
        }
    };

    const crearSprint = async (newSprint: ISprint) => {
        try {
            const añadirSprint = await addSprintApi(newSprint);
            if (añadirSprint) { addSprint(añadirSprint) }
        } catch (error) {
            console.error('Error al agregar un sprint:', error);
        }
    };

    const modificarSprint = async (sprint: ISprint) => {
        try {
            const editarSprint = await editSprintApi(sprint._id!, sprint);
            if (editarSprint) { editSprint(editarSprint) }
        } catch (error) {
            console.error('Error al editar el sprint:', error);
        }
    };

    const eliminarSprint = async (idSprint: string) => {
        try {
            //el sprint tiene tareas que tambien estan en el conjunto de tareas asique tambien las tendria que eliminar de ahi

            const sprint = await getSprintByIdApi(idSprint);

            // Eliminar todas las tareas asociadas al sprint
            await Promise.all(sprint.tareas.map((tarea) => eliminarTarea(tarea._id!))
            );

            await deleteSprintApi(idSprint); // Eliminar el sprint después de que todas las tareas fueron eliminadas
            deleteSprint(idSprint);  // Actualizar el estado global
        } catch (error) {
            console.error('Error al eliminar el sprint:', error);
        }
    };

    const getSprintById = async (id: string) => {
        try {
            const sprint = await getSprintByIdApi(id);
            if (sprint) { getSprint(sprint); }            
        } catch (error) {
            console.error('Error al encontrar el sprint:', error);
        }
        
    };

    const addTareaAlSprint = async (idSprint: string, idTarea: string) => {
        try {
            const sprintActualizado = await addTaskToSprintApi(idSprint, idTarea);
            if (sprintActualizado) {
                editSprint(sprintActualizado);
            }
        } catch (error) {
            console.error('Error al agregar tarea al sprint:', error);
        }
    };

    const removeTareaDelSprint = async (idSprint: string, idTarea: string) => {
        try {

            const sprintActualizado = await removeTaskFromSprintApi(idSprint, idTarea);
            if (sprintActualizado) {
                editSprint(sprintActualizado);
            }
        } catch (error) {
            console.error('Error al remover tarea del sprint:', error);
        }
    }
    return {
        listaSprints,
        activeSprint,
        getTodosLosSprint,
        crearSprint,
        modificarSprint,
        eliminarSprint,
        getSprintById,
        addTareaAlSprint,
        removeTareaDelSprint
    }
}
