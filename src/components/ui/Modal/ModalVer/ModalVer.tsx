import { FC } from "react";
import { ITarea } from "../../../../types/ITarea";
import { ISprint } from "../../../../types/ISprint";
import styles from "./ModalVer.module.css";
import { IoMdClose } from "react-icons/io";


type ModalVerProps = {
  dataView: ITarea | ISprint | null;
  handleCloseModal: () => void;
};

// Type guard para saber si es una tarea
const esTarea = (item: ITarea | ISprint): item is ITarea => {
  return (item as ITarea).estado !== undefined;
};


export const ModalVer: FC<ModalVerProps> = ({ dataView, handleCloseModal }) => {
  if (!dataView) return null;

  return (
    <div className={styles.containerModal}>
      <div className={styles.modal}>
        {esTarea(dataView) ? (
          <>
            <div className={styles.containerTitle}>
              <h2>Detalles de la Tarea</h2>
              <button onClick={handleCloseModal}><IoMdClose /></button>
            </div>
            <div className={styles.content}>
              <h3>{dataView.titulo}</h3>
              <p> {dataView.descripcion}</p>
              <p>Fecha Límite: {dataView.fechaLimite}</p>
            </div>
          </>
        ) : (
          <>
            <h2>Detalles del Sprint</h2>
            <div className={styles.content}>
              <h3>{dataView.nombre}</h3>
              <p><strong>Fecha de Inicio:</strong> {dataView.fechaInicio}</p>
              <p><strong>Fecha de Cierre:</strong> {dataView.fechaCierre}</p>
              <p><strong>Tareas:</strong></p>
              <ul>
                {dataView.tareas.map((tarea) => (
                  <li key={tarea._id}>{tarea.titulo}</li>
                ))}
              </ul>
            </div>
          </>
        )}


      </div>
    </div>
  );
};
