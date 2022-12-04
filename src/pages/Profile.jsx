import React from 'react'
import Navibar from '../components/Navibar'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import MyTransaction from '../components/partials/MyTransaction'
import { API } from "../config/api";
import { useQuery } from "react-query";
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

import styles from './Profile.module.css'


import ModalProfile from '../components/partials/ModalProfile'

export default function Profile() {
    // state untuk user
    const [state] = useContext(UserContext);

    let { data: Profile, refetch } = useQuery("profileCache", async () => {
        const response = await API.get("/user-profile");

        refetch()
        return response.data.data.profile;
    });

    // const globalrefetch = createContext(refetch)

    // transaksi

    return (
        <>

            <Navibar />
            <Container>
                <Row>
                    <Col md={6}>
                        <p className={styles.CardTitle}>
                            My Profile
                        </p>
                        <Row>
                            <ModalProfile refetch={refetch} />
                            <Col md={6}>
                                <img className={styles.Image}
                                    src={
                                        // Profile?.image === "http://localhost:5000/uploads/"
                                        //     ? <></>
                                        //     :
                                        Profile?.image
                                    }

                                    alt="Profile"
                                />
                            </Col>
                            <Col md={6}>
                                <div className={styles.TextWrapper}>
                                    <p className={styles.TextAtas}>
                                        Full Name
                                    </p>
                                    <p className={styles.TextBawah}>
                                        {state.user.name}
                                    </p>
                                </div>

                                <div className={styles.TextWrapper}>
                                    <p className={styles.TextAtas}>
                                        Email
                                    </p>
                                    <p className={styles.TextBawah}>
                                        {state.user.email}
                                    </p>
                                </div>
                                <div className={styles.TextWrapper}>
                                    <p className={styles.TextAtas}>
                                        Address
                                    </p>
                                    <p className={styles.TextBawah}>
                                        {Profile?.address}

                                    </p>
                                </div>
                                <div className={styles.TextWrapper}>
                                    <p className={styles.TextAtas}>
                                        Post Code
                                    </p>
                                    <p className={styles.TextBawah}>
                                        {Profile?.postal_code}

                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <MyTransaction />
                    </Col>
                </Row>
            </Container >

        </>
    )
}
