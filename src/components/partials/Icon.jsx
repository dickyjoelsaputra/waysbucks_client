import React from 'react'
import icon from '../../assets/kopi.png';
import styles from './Icon.module.css'

function Icon() {
    return (
        <>
            <img alt='icon gambar' className={styles.Icon} src={icon} />
        </>
    )
}

export default Icon