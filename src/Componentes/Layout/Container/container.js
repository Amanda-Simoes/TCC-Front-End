import styles from './style.css'

function Container(props) {
    return (
        // <div className={`${styles.container} ${styles[props.customClass]}`}>
        <div class="container">
            {props.children}
        </div>
    )
}

export default Container