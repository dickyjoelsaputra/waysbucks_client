import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

export default function RegisterForm({ Show, Hide }) {

    const [formuser, setUser] = useState({ email: "", password: "", name: "" })

    const handleSubmitRegister = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(formuser);

            // Insert data user to database
            const response = await API.post('/register', body, config);

            // Handling response here
        } catch (error) {
            console.log(error);
        }
    });


    return (
        <Modal show={Show} onHide={Hide} onSubmit={Hide} centered>
            <Modal.Body>
                <div className='px-4'>
                    <h1 className='py-3 text-danger'><b>Register</b></h1>
                    <Form onSubmit={(e) => handleSubmitRegister.mutate(e)} >
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <div className='border border-danger rounded' >
                                <Form.Control type="email" placeholder="Enter email"
                                    onChange={e => setUser({ ...formuser, email: e.target.value })}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <div className='border border-danger rounded' >
                                <Form.Control type="password" placeholder="Enter password"
                                    onChange={e => setUser({ ...formuser, password: e.target.value })}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <div className='border border-danger rounded' >
                                <Form.Control type="text" placeholder="Enter Username"
                                    onChange={e => setUser({ ...formuser, name: e.target.value })}
                                />
                            </div>
                        </Form.Group>
                        <div className="d-grid gap-2 my-4">
                            <Button variant="danger" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal.Body >
        </Modal >
    )
}
