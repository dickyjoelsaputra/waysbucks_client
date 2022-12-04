import React from 'react'
// import styled from 'styled-components'
import Navibar from '../components/Navibar'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import success from '../assets/success.png'
import cancle from '../assets/cancle.png'
import styles from './Transaction.module.css'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function Transaction() {

    const Gambor = styled.img`
        max-width: 100%;
    `

    let navigate = useNavigate()

    let { data: transactions } = useQuery("transactionsCache", async () => {
        const response = await API.get("/transactions");
        return response.data.data;
    });

    let handleSuccess = async (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const form = {
            id: id,
            status: "success"
        }
        API.patch("/transactionupdate", form, config);
        navigate(0)
    }


    let handleCancel = (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const form = {
            id: id,
            status: "cancel"
        }
        API.patch("/transactionupdate", form, config)
        navigate(0)
    }

    return (
        <>
            <Navibar />
            <Container className='mt-5'>
                <table className="table table-bordered">
                    <thead className='table-secondary'>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Post Code</th>
                            <th scope="col">Income</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((item, index) => (
                            <>
                                <tr>
                                    <th scope="row">{index + 1} , {item?.id}</th>
                                    <td>{item?.user.name}</td>

                                    <td>{item?.user?.profile?.address}</td>
                                    <td>{item?.user?.profile?.postal_code}</td>
                                    <td><p className={styles.IncomeColor}>{item?.total}</p></td>
                                    <td>
                                        {
                                            item?.status === "pending" ?
                                                <p className={styles.SWaiting}>Waiting Approve</p>
                                                : item?.status === "cancel" ?
                                                    <p className={styles.SCancle}>Cancel</p>
                                                    : item?.status === "success" ?
                                                        <p className={styles.SSucces}>On The Way</p>
                                                        :
                                                        <p className={styles.SOtw}>Waiting Payment</p>
                                        }
                                    </td>
                                    <td>
                                        <div className={styles.Wraple}>
                                            {
                                                item?.status === "pending" ?
                                                    <>
                                                        <div className={styles.Cancle}
                                                            onClick={() => { handleCancel(item?.id) }}
                                                        >Cancel</div>
                                                        <div className={styles.Approve}
                                                            onClick={() => { handleSuccess(item?.id) }}
                                                        >Approve</div>
                                                    </>
                                                    : item?.status === "cancel" ?
                                                        <img
                                                            className={styles.IconStatus}
                                                            src={cancle} />
                                                        : item?.status === "success" ?
                                                            <img
                                                                className={styles.IconStatus}
                                                                src={success} />
                                                            :
                                                            <p className={styles.SOtw}>Waiting Payment</p>
                                            }

                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))}
                        {/* <tr>
                            <th scope="row">2</th>
                            <td>Aryo</td>
                            <td>Bandung</td>
                            <td>32456</td>
                            <td><p className={styles.IncomeColor}>78.000</p></td>
                            <td><p className={styles.SSucces}>Succes</p></td>
                            <td><img className={styles.IconStatus} src={success} /></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Maestro</td>
                            <td>Medan</td>
                            <td>11156</td>
                            <td><p className={styles.IncomeColor}>45.000</p></td>
                            <td><p className={styles.SCancle}>Cancle</p></td>
                            <td><img className={styles.IconStatus} src={cancle} /></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Mayonaise</td>
                            <td>Papua</td>
                            <td>11156</td>
                            <td><p className={styles.IncomeColor}>20.000</p></td>
                            <td><p className={styles.SOtw}>On The Way</p></td>
                            <td><img className={styles.IconStatus} src={success} /></td>
                        </tr> */}
                    </tbody>
                </table>
            </Container>
        </>
    )
}
