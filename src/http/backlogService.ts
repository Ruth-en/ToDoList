import axios from "axios";
import { IBacklog, ITarea } from "../types/ITarea";

const API_URLB = "http://localhost:3000/backlog";

export const getBacklogApi = async (): Promise<IBacklog> => {
    try {
        const response = await axios.get<IBacklog>(API_URLB); // Petición directa a /backlog
        return response.data;// Accede al array de tareas del backlog
    } catch (error) {
        console.error("Error al obtener las tareas del backlog:", error);
        throw error;
    }
};

export const getTareasBacklogApi = async (): Promise<ITarea[]> => {
    try {
        const response = await axios.get<IBacklog>(API_URLB); // Petición directa a /backlog
        return response.data.tareas;// Accede al array de tareas del backlog
    } catch (error) {
        console.error("Error al obtener las tareas del backlog:", error);
        throw error;
    }
};

export const addTaskToBacklogApi = async (idTarea: string) => {
    try {
        const response = await axios.put(`${API_URLB}/add-task/${idTarea}`);
        return response.data;
    } catch (error) {
        console.error("Error al añadir una tarea al backlogApi:", error);
        throw error;
    }

}

export const removeTaskFromBacklogApi  = async (idTarea: string) =>{
    try {
        const response = await axios.put(`${API_URLB}/remove-task/${idTarea}`);
        return response.data;
    } catch (error) {
        console.error("Error al remover una tarea al backlogApi:", error);
        throw error;
    }
}