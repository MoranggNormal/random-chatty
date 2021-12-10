import styles from './signMethods.module.scss';


const SignMethods = (props) => {
    return (
        <section className={styles.signMethods}>
            {props.children}
        </section>
    )
}

export default SignMethods;
