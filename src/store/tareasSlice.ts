import { create } from "zustand";
import { ITarea } from "../types/ITarea";

export interface ITareasSlice {
    tasks: ITarea[];
    activeTarea: ITarea | null;
    setAllTasks: (allTarea: ITarea[]) => void;
    createTask: (newTarea: ITarea) => void;
    editTask: (updatedTarea: ITarea) => void;
    deleteTask: (idTarea: string) => void;
}

export const storeTareasSlice = create<ITareasSlice>((set) => ({
    tasks: [],
    activeTarea: null,

    setAllTasks: (allTareas) => {
        set({ tasks: allTareas });
    },

    //Crear una Tarea
    createTask: (newTarea) => {
        set((state) => ({ tasks: [...state.tasks, newTarea] }))
    },

    //Edita runa tarea
    editTask: (updatedTarea) => {
        set((state) => ({
            tasks: state.tasks.map(
                (tarea) => tarea._id === updatedTarea._id ? updatedTarea : tarea
            )
        }));
    },

    //Eliminar tarea
    deleteTask: (idTarea) => {
        set((state) => ({
            tasks: state.tasks.filter(
                (tarea) => tarea._id !== idTarea)
        }))
    },
}
))

