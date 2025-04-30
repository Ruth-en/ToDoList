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
    const [tareasProxVencer, setTareasProxVencer] = useState(false);

    useEffect(() => {
        getBacklog();
        getTodasTareasBacklog();
    }, []);

    const handleCreateTareaBacklog = () => {
        setSelectedTarea(null);
        setOpenModalAdd(true);

    }
    const handleCloseModalA = () => { setOpenModalAdd(false) };

    //filtro
    const tareaProximaAVencer = (fechaLimite: string): boolean => {
        const hoy = new Date();
        const fecha = new Date(fechaLimite);
        const diffTime = fecha.getTime() - hoy.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 3;
    };

    const tareasFiltradas = tareasProxVencer //si es true me devuelve las tareas filtradas sino todas las tareas del backlog
        ? tareasBacklog.filter(t => tareaProximaAVencer(t.fechaLimite))
        : tareasBacklog;

    const toggleFiltroProximas = () => {
        setTareasProxVencer(prev => !prev); //cambio el estado de tareasProxVencer

    };
    return (
        <section className={styles.containerPrincipal}>
            <div className={styles.containerTitleAddTarea}>
                <h2>Tareas del Backlog</h2>
                <button onClick={toggleFiltroProximas}>
                        {tareasProxVencer ? "Ver todas las tareas" : "Ver solo tareas próximas a vencer"}
                    </button>
                <button onClick={handleCreateTareaBacklog}>Crear tarea <MdOutlinePlaylistAdd /></button>
            </div>
            <div className={styles.containerTareas}>
                {tareasFiltradas.length > 0 ? (
                    tareasFiltradas.map((el) =>
                        <ItemTarea
                            key={el._id}
                            tarea={el}
                            sprints={listaSprints}
                        />)
                ) : (
                    <h3>No hay tareas</h3>
                )}
            </div>
            {openModalAdd && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalA} />}
        </section>
    )
}
