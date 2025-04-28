import styles from './Header.module.css'

export const Header = () => {
    return (
        <header className={styles.containerHeader}>
            <img className={styles.HeaderLogo } src="src/assets/images/mateYBizcochuelo.PNG" alt="Logo" />
            <div>
                <h1 className={styles.HeaderTitle}>Mate y Bizcochuelo</h1>
                <p className={styles.HeaderSubTitle}>Administrador de tareas</p>
            </div>
        </header>
    )
}
