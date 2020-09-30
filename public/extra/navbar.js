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

        console.log({ "names": namesArray, "phoneNumbers": numbersArray })
        fetch('/new-contact',
            {
                method: "POST",
                body: JSON.stringify({ "names": namesArray, "phoneNumbers": numbersArray })
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error));

        handleClose()
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
                            <CDropdownItem>Log out</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CNavbarNav>
            </CNavbar>
            {
                addModal
            }
        </div >
    )
};

export default NavBar;