import React from 'react'
import cleponcoffe from '../../assets/kopi/Clepon Coffe.jpg'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import qrqode from '../../assets/qr-code 1.png'
import Image from 'react-bootstrap/Image'
import kopilogo from '../../assets/kopi.png'
import styles from './MyTransaction.module.css'
import { useQuery } from 'react-query'
import { API } from '../../config/api'
import { useNavigate } from 'react-router-dom'

export default function Transaction() {

    let navigate = useNavigate()

    let { data: ProfileTransactions } = useQuery(
        "profiletransactionsCache",
        async () => {
            const response = await API.get("/user-transaction");
            return response.data.data;
        }
    );

    return (
        <>
            <p className={styles.CardTitle}>
                My Transaction
            </p>
            {ProfileTransactions?.map((item, index) => (
                <div className={styles.Rectangle}>
                    <Row>
                        <Col md={8}>
                            <div className={styles.RightContentWrapper}>
                                <Row>
                                    {item?.carts?.map((cart, idx) => (
                                        <>
                                            <Col md={5}>
                                                <img className={styles.ImageKanan} src={cart?.product?.image} />
                                            </Col>
                                            <Col md={7}>
                                                <p className={styles.RightTitle}>
                                                    {cart?.product?.title}
                                                </p>
                                                <p className={styles.Pee}>
                                                    <span className={styles.Sepan}>Saturday</span>, 5 March 2020</p>
                                                {cart.topping.map((topping, idx) => (
                                                    <span className={styles.Topieng}>
                                                        {topping?.title},
                                                    </span>
                                                ))}

                                            </Col>
                                        </>
                                    ))}
                                </Row>

                            </div>
                        </Col>
                        <Col md={4}>
                            <div className={styles.TrsKanan}>
                                <img className={styles.Logos} src={kopilogo} />
                                <Image src={qrqode} className='mb-3' />
                                <p className={styles.Pricee}>
                                    {item?.total}
                                </p>
                                <p className={styles.Pricee}>
                                    {item?.status}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            ))}

        </>
    )
}
