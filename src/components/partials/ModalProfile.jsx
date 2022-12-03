import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useMutation } from 'react-query'
import { API } from '../../config/api';

function ModalProfile({ refetch }) {

    // Handle Modal Edit Profile
    const [showProfile, setProfileShow] = useState(false);
    const handleProfileClose = () => setProfileShow(false);
    const handleProfileShow = () => setProfileShow(true);

    // Function Untuk Edit Profile
    const [form, setForm] = useState({
        address: "",
        postal_code: "",
        image: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("address", form.address);
            formData.set("postal_code", form.postal_code);

            const res = await API.patch("/profile", formData, config);
            console.log(res)
            setProfileShow(false);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <>
            <Button onClick={handleProfileShow} className='px-4 my-3' variant="danger" size='sm'>Edit Profile</Button>{' '}

            <Modal show={showProfile} onHide={handleProfileClose} centered>
                <Modal.Body>
                    <div className='px-4'>
                        {/* Handle Error Disini */}
                        <Form className='py-3' onSubmit={(e) => handleSubmit.mutate(e)} >
                            <Form.Group className="mb-3">
                                <div className='border border-danger rounded border-opacity-25' >
                                    <Form.Control name="address"
                                        id="address" type="text" placeholder="input address"
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div className='border border-danger rounded border-opacity-25' >
                                    <Form.Control
                                        type="number" placeholder=" input postal code"
                                        name="postal_code"
                                        id="postalcode"
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div className='border border-danger rounded border-opacity-25' >
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        id="addProductImage"
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
                    </div >
                </Modal.Body>
            </Modal>

        </>
    )
}

export default ModalProfile