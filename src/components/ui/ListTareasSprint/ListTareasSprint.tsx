import { useParams } from "react-router-dom";
import { TareasPorEstado } from "../TareasPorEstado/TareasPorEstado"
import style from "./ListTareasSprint.module.css"
import { useSprints } from "../../../hooks/useSprints";
import { useEffect, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";

export const ListTareasSprint = () => {
  //Leer query param sprint para filtrar y mostrar las tareas del sprint seleccionado.
  const { sprintId } = useParams();
  const { activeSprint, getSprintById } = useSprints();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

  //cargo/seteo el sprint correspondiente por el useParam
  useEffect(() => {
    if (sprintId) {
      getSprintById(sprintId); //getSprintById va a pedir el sprint a tu API o al store y lo guarda en activeSprint.
    }
  }, [sprintId, getSprintById]);

  const sprint = activeSprint;

  if (!sprint) {
    return <p>Cargando sprint...</p>;
  }

  const handleCreateTareaSprint = () => {
    setSelectedTarea(null);
    setOpenModalAdd(true);
  }
  const handleCloseModalA = () => { setOpenModalAdd(false) };


  return (
    <section className={style.sectionSprint}>

      <div className={style.sprintHeader}>
        <h2>{sprint.nombre}</h2>
        <button onClick={handleCreateTareaSprint} className={style.sprintAddTarea}>Crear tarea <MdOutlinePlaylistAdd /></button>

      </div>

      <div className={style.sprintTablero}>
        <TareasPorEstado sprint={sprint} estadoTarea="pendiente" tareas={sprint.tareas} />
        <TareasPorEstado sprint={sprint} estadoTarea="en_progreso" tareas={sprint.tareas} />
        <TareasPorEstado sprint={sprint} estadoTarea="completada" tareas={sprint.tareas} />
      </div>
      {openModalAdd && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalA} idSprint={sprint._id}/>}

    </section>
  )
}
