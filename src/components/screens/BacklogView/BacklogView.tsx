import { Header } from "../../ui/Header/Header"
import { ListTareasBacklog } from "../../ui/ListTareasBacklog/ListTareasBacklog";
import { Navegacion } from "../../ui/Navegacion/Navegacion"
import styles from "./BacklogView.module.css";

export const BacklogView = () => {
    return (
        <div className={styles.containerBacklog}>
            <Header />
            <Navegacion />
            <ListTareasBacklog />
        </div>
    )
}
