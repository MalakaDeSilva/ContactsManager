'use strict'

import { CCol, CImg, CNavbar, CNavbarNav, CNavbarBrand, CRow, CToggler, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

import icon from '../extra/call.png';


const NavBar = () => {
    let map = new Map();
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [logOut, setLogOut] = useState(false);
    const onLogOut = () => setLogOut(!logOut);

    const changeHandler = (e) => {
        e.preventDefault()
        map.set(e.target.id, e.target.value)
    }

    const handleSave = e => {
        e.preventDefault()
        let name = {}
        let number = {}
        let namesArray = []
        let numbersArray = []

        for (let key of map.keys()) {
            if (key === 'givenName') {
                name[key] = map.get(key)
                namesArray.push(name)
            }

            if (key === 'value') {
                number[key] = map.get(key)
                numbersArray.push(number)
            }
        }

        setTimeout(() => {

            fetch('/new-contact',
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: "POST",
                    body: JSON.stringify({ "names": namesArray, "phoneNumbers": numbersArray })
                })
                .then((data) => {
                    window.location.reload(true);
                })
                .catch(error => console.log(error));
        }, 4000);

        handleClose()
    }
    
    const handleLogOut = e => {
        fetch('/log-out')
            .then((data) => { console.log(data) })
            .catch((err) => { console.log(err) });

        onLogOut(!logOut);
    }

    let addModal = <div>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title><span className="modal_title">New Contact</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="givenName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="input" placeholder="Display name" onChange={changeHandler} />
                    </Form.Group>

                    <Form.Group controlId="value">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="input" placeholder="Phone Number" onChange={changeHandler} />
                    </Form.Group>
                </Form>
                <Button style={{ marginRight: 10 }} variant="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
            </Button>
            </Modal.Body>
        </Modal>
    </div>

    let logOutModal = <div>
        <Modal show={logOut} onHide={onLogOut} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title><span className="modal_title">Log Out</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Are you sure?</h5>
                <Button style={{ marginRight: 30, marginLeft: 30, marginTop: 10, width: 100 }} variant="primary" onClick={handleLogOut}>
                    Yes
                </Button>
                <Button style={{ marginTop: 10, width: 100 }} variant="secondary" onClick={onLogOut}>
                    No
                </Button>
            </Modal.Body>
        </Modal>
    </div>



    return (
        <div>
            <CNavbar expandable="md" color="primary" sticky={true}>
                <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
                <CNavbarBrand>
                    <CRow>
                        <CCol sm="1">
                            <CImg src={icon} style={{ width: 30, marginTop: 8 }}></CImg>
                        </CCol>
                        <CCol sm="3" style={{ marginLeft: 10 }}>
                            <h1>Contacts Manager</h1>
                        </CCol>
                    </CRow>
                </CNavbarBrand>
                <CNavbarNav className="ml-auto">
                    <CDropdown
                        inNav
                    >
                        <CDropdownToggle color="primary">
                            User
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={handleShow}>New Contact</CDropdownItem>
                            <CDropdownItem divider={true}></CDropdownItem>
                            <CDropdownItem onClick={onLogOut}>Log out</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CNavbarNav>
            </CNavbar>
            {
                addModal
            }
            {
                logOutModal
            }
        </div >
    )
};

export default NavBar;