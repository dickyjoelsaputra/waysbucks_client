import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navusericon from './partials/Navusericon';

import Cart from './partials/Cart'
import Icon from './partials/Icon';
import Navadminicon from '../admin/Navadminicon';

import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

export default function Navibar({ refetch }) {

    const [showRegister, setRegisterShow] = useState(false);
    const handleRegisterClose = () => setRegisterShow(false);
    const handleRegisterShow = () => setRegisterShow(true);
    const [showLogin, setLoginShow] = useState(false);
    const handleLoginClose = () => setLoginShow(false);
    const handleLoginShow = () => setLoginShow(true);

    const [state] = useContext(UserContext);
    const isLogin = state.isLogin;

    return (
        <div>
            <Navbar expand="lg">
                <Container>
                    <Link to={"/"}>
                        <Icon />
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">

                        {
                            isLogin ?
                                <>
                                    {state.user.status === 'admin' ?
                                        <>
                                            <Navadminicon />
                                        </>
                                        :
                                        <>
                                            <Cart />
                                            <Navusericon />
                                        </>
                                    }
                                </>
                                :
                                <>
                                    <Button onClick={handleRegisterShow} className='mx-3 px-3' variant="outline-danger" size='sm'>Register</Button>{' '}

                                    <Button onClick={handleLoginShow} className='px-4' variant="danger" size='sm'>Login</Button>{' '}

                                    <RegisterForm Show={showRegister} Hide={handleRegisterClose} />
                                    <LoginForm refetch={refetch} Show={showLogin} Hide={handleLoginClose} />
                                </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar >

        </div>
    )
}