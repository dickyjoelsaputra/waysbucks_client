import React from 'react'
import Keranjangs from '../../assets/Keranjang.png'
import styles from './Cart.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { API } from '../../config/api'
import { useEffect } from 'react'

export default function Cart() {

    const [bubble, setBubble] = useState([]);

    useEffect(() => {
        API.get("/carts-id")
            .then((res) => {
                setBubble(res.data.data);
            })
            .catch((err) => console.log("error", err));
    });

    return (
        <>
            <div className={styles.BadgeWrapper}>
                <Link to="/mycart">
                    <span className={styles.Badge}>{bubble?.length}</span>
                    <img alt='keranjang' className={styles.Keranjang} src={Keranjangs} />
                </Link>
            </div>


        </>
    )
}

