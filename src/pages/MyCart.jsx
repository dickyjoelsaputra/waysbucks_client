import React from 'react'
import Navibar from '../components/Navibar'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Stack from 'react-bootstrap/esm/Stack'
import TempatSampah from "../assets/tempatsampah.png"
import styles from "./MyCart.module.css"
import { useQuery } from 'react-query'
import { API } from '../config/api'

export default function MyCart() {

    // cart ambil data cart
    let { data: cart, refetch } = useQuery("cartsCache", async () => {
        const response = await API.get("/carts-id");
        return response.data.data;
    });

    let resultTotal = cart?.reduce((a, b) => {
        return a + b.subtotal;
    }, 0);

    // remove cart
    let handleDelete = async (id) => {
        await API.delete(`/cart/` + id);
        refetch()
    };

    return (
        <>
            <Navibar />
            <Container>
                <p className={styles.CardTitle}>
                    My Cart
                </p>
                <Row>
                    <h5 className='text-danger'>Review your order</h5>
                    <hr />
                    <Col md={7} className=''>

                        <div>
                            {
                                cart?.map((e) => (
                                    <>
                                        <Row className='my-3'>
                                            <Col md={3}>
                                                <img className={styles.ImageKiri} alt='gambarkiri' src={e?.product?.image} />
                                            </Col>
                                            <Col md={6} className='my-auto'>
                                                <p className='h4 bolder text-danger'> {e?.product?.title} </p>
                                                <p><b className='text-danger'>Toping : </b>
                                                    {e.topping?.map((s, idx) => (
                                                        <>
                                                            <span span className='text-danger' key={idx} > {s.title}
                                                            </span>
                                                        </>
                                                    ))}
                                                </p>
                                            </Col>
                                            <Col md={3} className='my-auto'>
                                                <p className='text-danger text-end'>{e?.subtotal}</p>
                                                <img alt='gambaricon sampah' style={{ cursor: 'pointer' }} className='float-end' src={TempatSampah} onClick={() => { handleDelete(e.id) }} />
                                            </Col>
                                        </Row>
                                    </>
                                ))

                            }
                        </div>
                    </Col>
                    <Col md={5}>
                        <Col>
                            <Stack direction="vertical">
                                <Stack direction="horizontal">
                                    <p>Subtotal</p>
                                    <p className="ms-auto">
                                        {resultTotal}
                                    </p>
                                </Stack>
                                <Stack direction="horizontal">
                                    <p>Qty</p>
                                    <p className="ms-auto">{cart?.length}</p>
                                </Stack>
                                <hr />
                                <Stack direction="horizontal">
                                    <p>Total</p>
                                    <p className="ms-auto">
                                        {resultTotal}
                                    </p>
                                </Stack>
                            </Stack>
                            <div className="d-grid gap-2 my-4">
                                <Button variant="danger" type="submit">
                                    Pay
                                </Button>
                            </div>
                        </Col>
                    </Col>
                </Row >
            </Container >
        </>
    )
}
