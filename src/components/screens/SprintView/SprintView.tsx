import { Header } from "../../ui/Header/Header"
import { Navegacion } from "../../ui/Navegacion/Navegacion"
import styles from "./SprintView.module.css";
import { ListTareasSprint } from "../../ui/ListTareasSprint/ListTareasSprint";

export const SprintView = () => {

  return (
    <div className={styles.containerSprint}>
      <Header />
      <main className={styles.containerMain}>
        <Navegacion />
        <ListTareasSprint />
      </main>

    </div>
  )
}
