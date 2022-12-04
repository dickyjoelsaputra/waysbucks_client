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
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import ModalToping from './Modal/ModalToping';

export default function AddToping() {

    // FETCHING TOPING
    let { data: toppings, refetch } = useQuery("toppingsCacheSSS", async () => {
        const response = await API.get("/toppings");
        return response.data.data;
    });


    return (
        <>
            <Navibar />
            <Container className='mt-5'>
                <ModalToping refetch={refetch} />
                <table className="table table-bordered">
                    <thead className='table-secondary'>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            toppings?.map((e, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>                         <img src={e?.image} alt="" srcset="" width={100} />
                                    </td>
                                    <td>{e.title}</td>
                                    <td>{e.price}</td>
                                    <td width={290}>
                                        <Button className='ms-5' variant="primary">Edit</Button>
                                        <Button className='ms-5' variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Container>
        </>
    )
}
