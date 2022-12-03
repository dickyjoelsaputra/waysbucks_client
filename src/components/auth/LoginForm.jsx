import React from 'react'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useQuery } from 'react-query';

export default function LoginForm({ Show, Hide }) {

    const [state, dispatch] = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    //
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitLogin = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const body = JSON.stringify(form);
            const response = await API.post("/login", body, config);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data,
            });

        } catch (error) {
            console.log(error);
        }
    });

    return (
        <Modal show={Show} onHide={Hide} onSubmit={Hide} centered>
            <Modal.Body>
                <div className='px-4'>
                    {/* Handle Error Disini */}
                    <h1 className='py-3 text-danger'><b>Login</b></h1>
                    <Form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='email'>Email address</Form.Label>
                            <div className='border border-danger rounded border-opacity-25' >
                                <Form.Control name='email' id='email' type="email" placeholder="Enter email"
                                    onChange={handleChange}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='email'>Password</Form.Label>
                            <div className='border border-danger rounded border-opacity-25' >
                                <Form.Control name='password' id='password' type="password" placeholder="Enter password"
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
                    <p>
                        <a className='text-decoration-none pe-auto' href='/#'><span className='text-body'>Dont have an account ?</span><span style={{ border: "none" }}
                            className='btn ps-1 mb-1'>Click here</span></a>
                    </p>
                </div >
            </Modal.Body>
        </Modal>
    )
}

