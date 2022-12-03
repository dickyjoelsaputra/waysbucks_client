import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styles from './Cardlist.module.css'
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Cardlist() {

    // user data
    const [state] = useContext(UserContext);

    // Fetching product data from database
    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    return (
        <>
            <div className={styles.Badan}>
                <Row>
                    {products?.map((item, index) => (
                        <Col md={3} className='my-3'>
                            <Link className='text-decoration-none' to={state.isLogin === true ? `/detail-product/${item.id}` : ""}>
                                <div className={styles.WrapTambahan}>
                                    <Card bg="danger bg-opacity-25" style={{ width: "250px" }}>
                                        <Card.Img variant="top" style={{ height: "300px", objectFit: 'cover' }} src={item.image} />
                                        <Card.Body>
                                            <Card.Title>
                                                <p className={styles.CardTitle}>
                                                    {item.title}
                                                </p>
                                            </Card.Title>
                                            <Card.Text>
                                                <div className={styles.CardPrice}>
                                                    Rp.{item.price}
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}
