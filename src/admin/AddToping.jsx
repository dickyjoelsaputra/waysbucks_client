import React from 'react'
import { useState } from 'react';
import Navibar from '../components/Navibar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useMutation } from "react-query";

export default function AddToping() {
    const Gambor = styled.img`
        max-width: 100%;
    `

    const [preview, setPreview] = useState(null);
    const [previewName, setPreviewName] = useState("");

    const [form, setform] = useState({
        image: "",
        title: "",
        price: "",
    }); //Store product data

    //handle chahnge data on from
    const handleChange = (e) => {
        setform({
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

            navigate("/transaction");
        } catch (error) {
            console.log(error);
        }
    });


    return (
        <>
            <Navibar />
            <Container className='mt-5'>
                <Row>
                    <Col md="7">
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Toping Name</Form.Label>
                                <div className='border border-danger rounded border-opacity-25' >
                                    <Form.Control type="text" placeholder="Enter Toping Name"
                                        name="title"
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <div className='border border-danger rounded border-opacity-25' >
                                    <Form.Control type="number" placeholder="Enter Price"
                                        name="price"
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <div className='border border-danger rounded border-opacity-25' >
                                    <Form.Control type="file" placeholder="Enter Image URL"
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
            </Container>
        </>
    )
}
