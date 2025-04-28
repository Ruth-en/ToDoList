import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./ItemSprint.module.css"
import { IoEyeSharp } from "react-icons/io5";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useSprints } from "../../../hooks/useSprints";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface ItemSprint {
    sprint: ISprint;
    handleOpenModalEdit: (sprint: ISprint) => void;
}

export const ItemSprint: FC<ItemSprint> = ({ sprint, handleOpenModalEdit }) => {
    const navigate = useNavigate();
    const verListaTareasDelSprint = () => {
        navigate(`/sprint/${sprint._id}`);
    }
    const { eliminarSprint } = useSprints();

    const editarSprint = () => {
        handleOpenModalEdit(sprint);
    };

    const eliminarSprintt =  async  (id: string) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer y se eliminaran todas las tareas del sprint",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            await eliminarSprint(id);
            Swal.fire("¡Eliminado!", "El sprint ha sido eliminado.", "success");
        }
    };

    return (
        <div className={styles.ContainerItemSprint}>
            <div className={styles.ItemSprint__Info}>
                <h4>{sprint.nombre}</h4>
                <div>
                    <p>FI: {sprint.fechaInicio}</p>
                    <p>FC: {sprint.fechaCierre}</p>
                </div>
            </div>
            <div className={styles.ItemSprint__buttons}>
                <button onClick={verListaTareasDelSprint} style={{ backgroundColor: "#6BB0FF", color: "white" }}><IoEyeSharp /></button>
                <button onClick={editarSprint} style={{ backgroundColor: "#85C86D", color: "white"}}><FaPen /></button>
                <button onClick={() => { eliminarSprintt(sprint._id!); }} style={{ backgroundColor: "#FF6B6B", color: "white" }}><FaTrashAlt /></button>
            </div>
        </div>
    )
}
