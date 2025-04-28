import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./TareasPorEstado.module.css"
import { ItemTarea } from "../ItemTarea/ItemTarea";
import { ISprint } from "../../../types/ISprint";

interface Estado {
    sprint: ISprint;
    estadoTarea: "pendiente" | "en_progreso" | "completada";
    tareas: ITarea[];
    
}

const titulo = {
    pendiente: "Pendientes",
    en_progreso: "En progreso",
    completada: "Completadas"
}

export const TareasPorEstado: FC<Estado> = ({ sprint, estadoTarea, tareas }) => {

    const tareasPorEstado = tareas.filter((tarea) => tarea.estado === estadoTarea);

    return (
        <div className={style.columnaEstado}>
            <h3>{titulo[estadoTarea]}</h3>
            {tareasPorEstado.length > 0 ? (
                tareasPorEstado.map((tarea) =>
                    <ItemTarea
                        key={tarea._id}
                        tarea={tarea}
                        sprintId= {sprint._id}
                    
                    />
                )

            ) : (<p>No hay tareas {titulo[estadoTarea].toLowerCase()}</p>)}

        </div>
    )
}
