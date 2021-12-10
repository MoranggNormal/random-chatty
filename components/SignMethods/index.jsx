import styles from './signMethods.module.scss';


const SignMethods = (props) => {
    return (
        <aside className={styles.signMethods}>
            {props.children}
        </aside>
    )
}

export default SignMethods;
