import styles from './mainChat.module.scss';


const MainChat = (props) => {
    return (
        <main className={styles.mainChat}>
            {props.children}
        </main>
    )
}

export default MainChat;
