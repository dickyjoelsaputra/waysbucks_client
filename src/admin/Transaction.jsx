import React from 'react'
// import styled from 'styled-components'
import Navibar from '../components/Navibar'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import success from '../assets/success.png'
import cancle from '../assets/cancle.png'
import styles from './Transaction.module.css'

export default function Transaction() {

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
                        <tr>
                            <th scope="row">1</th>
                            <td>Sugeng No Pants</td>
                            <td>Cileungsi</td>
                            <td>16820</td>
                            <td><p className={styles.IncomeColor}>69.000</p></td>
                            <td><p className={styles.SWaiting}>Waiting Approve</p></td>
                            <td>
                                <div className={styles.Wraple}>
                                    <div className={styles.Cancle}>Cancle</div>
                                    <div className={styles.Approve}>Approve</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
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
                        </tr>
                    </tbody>
                </table>
            </Container>
        </>
    )
}
