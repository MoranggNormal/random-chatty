import styles from './signMethods.module.scss';


const SignMethods = (props) => {



    return (
        <aside className={styles.signMethods} style={props.uid ? {display: 'none'} : {display: 'flex'}}>
            {props.children}
        </aside>
    )
}

export default SignMethods;
