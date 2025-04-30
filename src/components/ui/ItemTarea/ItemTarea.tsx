import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./ItemTarea.module.css"
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { ISprint } from "../../../types/ISprint";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";
import { ModalVer } from "../Modal/ModalVer/ModalVer";
import { useTareas } from "../../../hooks/useTareas";
import Swal from "sweetalert2";
import { useBacklog } from "../../../hooks/useBacklog";
import { useSprints } from "../../../hooks/useSprints";

interface ItemTarea {
    tarea: ITarea;
    sprintId?: string;
    sprints?: ISprint[];
}

export const ItemTarea: FC<ItemTarea> = ({
    tarea,
    sprintId,
    sprints,
}) => {

    const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
    const [openModalVer, setOpenModalVer] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);


    const { eliminarTarea, modificarTarea } = useTareas();
    const { añadirTareaAlBacklog, quitarTareaDelBacklog } = useBacklog()
    const { addTareaAlSprint, removeTareaDelSprint } = useSprints();

    //click en ver abre el modal ver
    const handleOpenModalVer = (tarea: ITarea) => {
        setSelectedTarea(tarea);
        setOpenModalVer(true);
    }

    //click en editar abre el modal editar/añadir
    const handleOpenModalEdit = (tarea: ITarea) => {
        setSelectedTarea(tarea);
        setOpenModalEdit(true);
    }

    //Cerramos los modales
    const handleCloseModalEA = () => { setOpenModalEdit(false) };
    const handleCloseModalV = () => { setOpenModalVer(false) }

    //click en eliminar 
    const handleEliminarTarea = async (tarea: ITarea) => {
        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la tarea definitivamente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        const idTarea = tarea._id;
        if (confirm.isConfirmed && idTarea) {
            await quitarTareaDelBacklog(idTarea);
            await eliminarTarea(idTarea);
            Swal.fire("¡Eliminado!", "La tarea ha sido eliminada 🗑️", "success");
        }

    }

    //Seleccion del sprint al cual queremos madar la tarea
    const handleSelectSprint = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSprint(event.target.value); // Guardamos el sprint seleccionado
    }

    //Click en enviar la tarea al sprint ya seleccionado
    const handleEnviarSprint = () => {
        if (sprints && selectedSprint && tarea._id) {
            addTareaAlSprint(selectedSprint, tarea._id); // Enviamos la tarea al sprint seleccionado
            quitarTareaDelBacklog(tarea._id);// y la quitamos del backlog
        }
    }

    //Click en enviar tarea al backlog si estamos en un sprint
    const handleEnviarBacklog = () => {
        if (sprintId && tarea) {
            //Reseteamos  el estado de la tarea
            const tareaActualizada: ITarea = {
                ...tarea,
                estado: "pendiente"
            };
            modificarTarea(tareaActualizada);
            añadirTareaAlBacklog(tarea._id);
            removeTareaDelSprint(sprintId, tarea._id);
        }

    }

    const handleCambiarEstado = (tarea: ITarea) => {
        //if (!tarea._id) return;
        let nuevoEstado: ITarea["estado"] | null = null;

        if (tarea.estado === "pendiente") {
            nuevoEstado = "en_progreso";
        } else if (tarea.estado === "en_progreso") {
            nuevoEstado = "completada";
        } else {
            return;
        }
        const tareaActualizada: ITarea = {
            ...tarea,
            estado: nuevoEstado
        };

        modificarTarea(tareaActualizada);
    };

    const vencido = (fechaLimite: string): boolean => {
        const hoy = new Date();
        const fecha = new Date(fechaLimite);
        const diffTime = fecha.getTime() - hoy.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 0;
    };




    return (
        <div className={`${style.ContainerItemTarea} ${vencido(tarea.fechaLimite) ? style.tareaVencida : ''}`}>
            <div className={style.itemTareaPrincipal}>
                <div className={style.itemTareaInfo}>
                    <h4>{tarea.titulo}</h4>
                    <p>FL:{tarea.fechaLimite}</p>

                </div>
                {vencido(tarea.fechaLimite) ?
                    <>
                        <p className={style.textoVencimiento} >* Tarea vencida</p>
                    </>
                    :
                    <>
                        <div className={style.buttonsAndSelect}>
                            {sprints && (
                                <div className={style.sendSprint}>
                                    <select onChange={handleSelectSprint} value={selectedSprint || ''}>
                                        <option value="">Seleccionar Sprint</option>
                                        {sprints.map((sp) => (<option key={sp._id} value={sp._id}>{sp.nombre}</option>))}
                                    </select>
                                    <button className={style.sendButton}
                                        onClick={handleEnviarSprint}
                                        disabled={!selectedSprint}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                }
                <div className={style.buttonsViewEditDelete}>
                    <button onClick={() => handleOpenModalVer(tarea)} style={{ backgroundColor: "#6BB0FF", color: "white" }}><IoEyeSharp /></button>
                    <button onClick={() => handleOpenModalEdit(tarea)} style={{ backgroundColor: "#85C86D", color: "white" }}><FaPen /></button>
                    <button onClick={() => handleEliminarTarea(tarea)} style={{ backgroundColor: "#FF6B6B", color: "white" }}><FaTrashAlt /></button>
                </div>


            </div>

            {sprintId && (
                <div className={style.sprintSpace} >
                    <button className={style.sendBacklog} onClick={handleEnviarBacklog}>
                        Enviar al Backlog
                    </button>
                    <button className={style.changeState} onClick={() => handleCambiarEstado(tarea)}>
                        Cambiar estado
                    </button>
                </div>
            )}
            {openModalEdit && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalEA} />}
            {openModalVer && <ModalVer dataView={selectedTarea} handleCloseModal={handleCloseModalV} />}
        </div >

    )

}