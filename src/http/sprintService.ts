import axios from "axios";
import { ISprint } from "../types/ISprint";

const API_URLS = "http://localhost:3000/sprints";

export const getListaSprintApi = async (): Promise<ISprint[]> => {
    try {
        const response = await axios.get<ISprint[]>(API_URLS);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los sprint:", error);
        throw error;
    }
}

export const getSprintByIdApi = async (idSprint:string): Promise<ISprint> =>{
    try {
        const response = await axios.get<ISprint>(`${API_URLS}/${idSprint}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los sprint:", error);
        throw error;
    }
}
// Función para agregar un nuevo sprint
export const addSprintApi = async (newSprint: ISprint) => {
    try {
        const response = await axios.post<ISprint>(API_URLS, newSprint);
        return response.data;
    } catch (error) {
        console.error("Error al añadir un sprint:", error);
        throw error;
    }
}

// Función para actualizar un sprint existente
export const editSprintApi = async (sprintId: string, updatedSprint: ISprint) => {
    try {
        const response = await axios.put<ISprint>(`${API_URLS}/${sprintId}`, updatedSprint);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar sprint (id: ${sprintId}) :`, error);
        throw error;
    }
}

// Función para eliminar un sprint
export const deleteSprintApi = async (sprintId: string) => {
    try {
        const response = await axios.delete(`${API_URLS}/${sprintId}`);
        return response
    } catch (error) {
        console.error(`Error al eliminar sprint (id: ${sprintId}):`, error);
        throw error;
    }
};

/**------------------------------------------------------------ */

// Función para agregar una tarea a un sprint
export const addTaskToSprintApi = async (sprintId: string, taskId: string): Promise<ISprint> => {
    try {
        const response = await axios.put<ISprint>(`${API_URLS}/${sprintId}/add-task/${taskId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener las tareas del sprint (id: ${sprintId}):`, error);
        throw error;
    }
};

// Función para remover una tarea a un sprint y mandarla al backlog
export const removeTaskFromSprintApi = async (sprintId: string, taskId: string): Promise<ISprint> => {
    try {
        const response = await axios.put<ISprint>(`${API_URLS}/${sprintId}/remove-task/${taskId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener las tareas del sprint (id: ${sprintId}):`, error);
        throw error;
    }
};
