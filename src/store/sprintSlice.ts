import { create } from "zustand";
import { ISprint } from "../types/ISprint";


export interface ISprintListaSlice {
    listaSprints: ISprint[];
    activeSprint: ISprint | null;
    //getSprint: (idSprint: string) => void;
    setAllSprint: (allSprint: ISprint[]) => void;
    getSprint:(sprint:ISprint)=> void;
    addSprint: (newSprint: ISprint) => void;
    editSprint: (updatedSprint: ISprint) => void;
    deleteSprint: (idSprint: string) => void;
}

export const storeSprintSlice = create<ISprintListaSlice>((set) => ({
    listaSprints: [],
    activeSprint: null,

    setAllSprint: (allSprint) => {
        set({ listaSprints: allSprint })
    },

    getSprint: (sprint) => {
        set({ activeSprint: sprint})
    },

    //Añadir un sprint
    addSprint: (newSprint) => {
        set((state) => ({ listaSprints: [...state.listaSprints, newSprint] }))
    },

    //Editar un sprint
    editSprint: (updatedSprint) => {
        set((state) => ({
            listaSprints: state.listaSprints.map((sprint) => sprint._id === updatedSprint._id ? updatedSprint : sprint)
        }));
    },

    //Eliminar un sprint
    deleteSprint: (idSprint) => {
        set((state) => ({
            listaSprints: state.listaSprints.filter((sprint) => sprint._id !== idSprint),
            activeSprint:
                state.activeSprint?._id === idSprint ? null : state.activeSprint,
        }));
    },

}))