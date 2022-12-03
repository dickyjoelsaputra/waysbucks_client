import React from 'react'
import cleponcoffe from '../../assets/kopi/Clepon Coffe.jpg'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import qrqode from '../../assets/qr-code 1.png'
import Image from 'react-bootstrap/Image'
import kopilogo from '../../assets/kopi.png'
import styles from './MyTransaction.module.css'

export default function Transaction() {

    return (
        <>
            <p className={styles.CardTitle}>
                My Transaction
            </p>
            <div className={styles.Rectangle}>
                <Row>
                    <Col md={8}>
                        <div className={styles.RightContentWrapper}>
                            <Row>
                                <Col md={5}>
                                    <img className={styles.ImageKanan} src={cleponcoffe} />
                                </Col>
                                <Col md={7}>
                                    <p className={styles.RightTitle}>
                                        Ice Coffe Palm Suggar

                                    </p>
                                    <p className={styles.Pee}>
                                        <span className={styles.Sepan}>Saturday</span>, 5 March 2020</p>
                                    <p className={styles.Topieng}>
                                        Toping : Billy Berry Boba, Buble Tea Gum
                                    </p>
                                    <p className={styles.Pricee}>

                                        Price : Rp.33.000
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <img className={styles.ImageKanan} src={cleponcoffe} />
                                </Col>
                                <Col md={7}>
                                    <p className={styles.RightTitle}>
                                        Ice Coffe Palm Suggar

                                    </p>
                                    <p className={styles.Pee}>
                                        <span className={styles.Sepan}>Saturday</span>, 5 March 2020</p>
                                    <p className={styles.Topieng}>
                                        Toping : Billy Berry Boba, Buble Tea Gum
                                    </p>
                                    <p className={styles.Pricee}>

                                        Price : Rp.33.000
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className={styles.TrsKanan}>
                            <img className={styles.Logos} src={kopilogo} />
                            <Image src={qrqode} />
                        </div>
                    </Col>
                </Row>
            </div>

        </>
    )
}
