import Navibar from '../components/Navibar'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import buttonceklis from '../assets/buttonceklis.png'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ProductDetail.module.css'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { useMutation } from 'react-query'

export default function ProductDetail() {
    const navigate = useNavigate();

    // fatching product dan toping
    let { id } = useParams();
    let { data: product } = useQuery("productCache", async () => {
        const response = await API.get("/product/" + id);
        return response.data.data;
    });

    let { data: toppings } = useQuery("toppingsCache", async () => {
        const response = await API.get("/toppings");
        return response.data.data;
    });


    // HANDLE TOPING
    const [Topieng, setTopieng] = useState([])
    const [TopiengHarga, setTopiengHarga] = useState([0])

    const handleCeklis = (element, topingprice) => {
        let filtered = Topieng.filter(e => e === element)
        if (filtered[0] !== element) {
            // pas di klik
            setTopieng([...Topieng, element])
            setTopiengHarga([Number(...TopiengHarga) + Number(topingprice)])
        } else {
            // pas di gak klik
            setTopieng(Topieng.filter(e => e !== element))
            setTopiengHarga([Number(...TopiengHarga) - Number(topingprice)])
        }
    }


    let MapToping = TopiengHarga.map(Number);
    let ReduceHarga = MapToping.reduce((a, b) => {
        return a + b;
    });
    // TOTAL HARGA TOPING + PRODUCT PRICE
    const totalharga = ReduceHarga + product?.price
    // quality = 1
    let qty = 1;

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            await API.post("/transaction", config);

            const body = JSON.stringify({
                topping_id: Topieng,
                subtotal: totalharga,
                product_id: parseInt(id),
                qty: qty,
            });

            await API.post("/cart", body, config);

        } catch (error) {
            console.log(error);
        }
    });


    return (
        <>
            <Navibar />
            <Container>
                <div className={styles.Wrapper}>
                    <Row>
                        <Col md={5}>
                            <img className={styles.Gambar} src={product?.image} />
                        </Col>

                        <Col md={7}>
                            <p className={styles.Detail}>{product?.title}</p>
                            <p className={styles.HargaItem} >Rp.{product?.price}</p>
                            <p className={styles.Toto}>Toping</p>
                            <Row>
                                {
                                    toppings?.map((e) => {
                                        return <>
                                            <Col md={3}>
                                                <div className={styles.Wraper} onClick={() => handleCeklis(e.id, e.price)} >
                                                    {
                                                        Topieng.filter(f => f === e.id)[0]
                                                            ?
                                                            <img className={styles.Badge} src={buttonceklis} />
                                                            :
                                                            <img className='d-none' src={buttonceklis} />
                                                    }
                                                    <img className={styles.GambarToping} src={e.image} />
                                                    <p className={styles.NamaToping}>{e.title}</p>
                                                    <p className={styles.HargaToping}>Rp.{e.price}</p>
                                                </div>
                                            </Col>
                                        </>
                                    })
                                }

                            </Row>
                            <div className='d-flex justify-content-between'>
                                <p className={styles.Toto}>Total</p>
                                <p className={styles.Toto}>Rp. {totalharga}</p>
                            </div>

                            <div className="d-grid gap-2">
                                <button className={styles.Buton}
                                    onClick={(e) => handleSubmit.mutate(e)}>Add To Chart
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div >
            </Container >
        </>
    )
}
