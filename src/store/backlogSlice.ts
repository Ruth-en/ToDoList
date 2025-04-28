import { create } from "zustand";
import { IBacklog, ITarea } from "../types/ITarea";

export interface IBacklogSlice {
backlog: IBacklog  | null ;
tareasBacklog: ITarea[];
setBacklog: (backlog: IBacklog) => void;
setTareasBacklog: (tareas: ITarea[]) => void;
agregarTareaAlBacklog: (newTareas: ITarea) => void;
removerTareaDelBacklog: (idTarea: string)=> void;
}

export const storeBacklogSlice = create<IBacklogSlice>((set)=> ({
    backlog: null,
    tareasBacklog: [],
    //backlog (uno)
    setBacklog: (backlog) => {set({backlog})},

    //Tareas del backlog
    setTareasBacklog: (tareas) => {set({ tareasBacklog: tareas})},

    agregarTareaAlBacklog: (newTareas) => {
        set((state)=> ({
            tareasBacklog: [...state.tareasBacklog, newTareas ]
        }))
    },

    //remover tarea del baklog
    removerTareaDelBacklog: (idTarea) =>{
        set((state)=>({
            tareasBacklog: state.tareasBacklog.filter((tareas) => tareas._id !== idTarea)
        }))
    }
}))
    