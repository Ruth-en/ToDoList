import { ITarea } from "./ITarea"

export interface ISprint{
    _id?:string
    fechaInicio:string
    fechaCierre:string
    nombre:string
    tareas: ITarea[]
}

export interface ISprintLista{
    sprints: ISprint[]
}