import { useEffect, useState } from "react";
import { ItemTarea } from "../ItemTarea/ItemTarea";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import styles from "./ListTareasBacklog.module.css"
import { ITarea } from "../../../types/ITarea";
import { useSprints } from "../../../hooks/useSprints";
import { useBacklog } from "../../../hooks/useBacklog";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";

export const ListTareasBacklog = () => {

    const {
        tareasBacklog,
        getBacklog,
        getTodasTareasBacklog,
    } = useBacklog();
    const { listaSprints } = useSprints();

    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

    useEffect(() => {
        getBacklog();
        getTodasTareasBacklog();
    }, []);

    const handleCreateTareaBacklog = () => {
        setSelectedTarea(null);
        setOpenModalAdd(true);

    }
    const handleCloseModalA = () => { setOpenModalAdd(false) };

    return (
        <section className={styles.containerPrincipal}>
                <div className={styles.containerTitleAddTarea}>
                    <h2>Tareas del Backlog</h2>
                    <button onClick={handleCreateTareaBacklog}>Crear tarea <MdOutlinePlaylistAdd /></button>
                </div>
                <div className={styles.containerTareas}>
                    {tareasBacklog.length > 0 ? (
                        tareasBacklog.map((el) =>
                            <ItemTarea
                                key={el._id}
                                tarea={el}
                                sprints={listaSprints}
                            />)
                    ) : (
                        <h3>No hay tareas</h3>
                    )}
                </div>
            {openModalAdd && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalA}/>}
        </section>
    )
}
