import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Navibar from '../../components/Navibar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';

export default function ModalToping({ refetch }) {
    const Gambor = styled.img`
        max-width: 100%;
    `
    const [previewName, setPreviewName] = useState(""); //name
    const [preview, setPreview] = useState(null); //image

    const [form, setForm] = useState({
        image: "",
        title: "",
        price: "",
    }); //Store data product

    //handle chahnge data on from
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
            setPreviewName(e.target.files[0].name);
        }
    };

    let navigate = useNavigate();

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("title", form.title);
            formData.set("price", form.price);

            // Insert category data
            await API.post("/topping", formData, config);

            handleClose()
            refetch()
        } catch (error) {
            console.log(error);
        }
    });


    // HANDLE MODAL
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => setModalShow(false);

    return (
        <>
            <Button variant="success" className='mb-3' onClick={() => setModalShow(true)}>
                Add Toping
            </Button>

            <Modal size="lg" show={modalShow} onHide={handleClose} onSubmit={handleClose} centered>
                <Modal.Body>
                    <h4 className='text-success'>Add Product</h4>
                    <Row>
                        <Col md="7">
                            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Product Name</Form.Label>
                                    <div className='border border-danger rounded border-opacity-25' >
                                        <Form.Control
                                            type="text" placeholder="Enter Product Name"
                                            name="title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <div className='border border-danger rounded border-opacity-25' >
                                        <Form.Control
                                            type="number" placeholder="Enter Price"
                                            name="price"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <div className='border border-danger rounded border-opacity-25' >
                                        <Form.Control
                                            type="file"
                                            id="addProductImage"

                                            className="photoProduct"
                                            name="image"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>

                                <div className="d-grid gap-2 my-4">
                                    <Button variant="danger" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                        <Col md="5">
                            <Gambor src={preview} />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
