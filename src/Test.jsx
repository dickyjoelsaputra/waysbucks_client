import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
// import { useNavigate } from "react-router-dom";

export default function Test({ Show, Hide }) {
    // state untuk input user
    // const navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "", username: "", image: "", role: "user" })

    // let FindData = localStorage.getItem('USER_DATA')
    let UserContent = []

    const submitHandle = (e) => {
        e.preventDefault()

        localStorage.setItem("DATA_LOGIN", JSON.stringify(user))

    }

    
    return (
        // <Modal show={Show} onHide={Hide} onSubmit={Hide} centered>
        //     <Modal.Body>
                // <div className='px-4'>
                //     <h1 className='py-3 text-danger'><b>Register</b></h1>
                    <Form onSubmit={submitHandle}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <div className='border border-danger rounded border-opacity-25' >
                                <Form.Control type="email" placeholder="Enter email"
                                    onChange={e => setUser({ ...user, email: e.target.value })}
                                    value={user.email}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <div className='border border-danger rounded border-opacity-25' >
                                <Form.Control type="password" placeholder="Enter password"
                                    onChange={e => setUser({ ...user, password: e.target.value })}
                                    value={user.password}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <div className='border border-danger rounded border-opacity-25' >
                                <Form.Control type="text" placeholder="Enter Username"
                                    onChange={e => setUser({ ...user, username: e.target.value })}
                                    value={user.username}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <div className='border border-danger rounded border-opacity-25' >
                                <Form.Control type="text" placeholder="Enter Username"
                                    onChange={e => setUser({ ...user, image: e.target.value })}
                                    value={user.image}
                                />
                            </div>
                        </Form.Group>

                        <div className="d-grid gap-2 my-4">
                            <Button variant="danger" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                // </div>
        //     </Modal.Body >
        // </Modal >
    )
}
