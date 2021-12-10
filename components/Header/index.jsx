import styles from "./header.module.scss"

const Header = (props) => {
    return(
        <header className={styles.header}>
        <img src={props.photo} alt={props.name} />
        <h1>Olá, {props.name}</h1>
        </header>
    )
}

export default Header