import { CButton, CImg, CCol, CNavbar, CNavbarBrand, CRow, CToggler } from '@coreui/react';
import React, { useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';

import googleicon from './extra/google.png';
import icon from './extra/call.png';

import PrivacyPolicy from './extra/privacypolicy';
import Footer from "./extra/footer";

const SignIn = () => {
    const [show, setShow] = useState(false);
    
    const handleClick = () => {
        fetch('/auth-init',
            {
                method: 'GET',
            })
            .then((res) => res.json())
            .then((jsonres) => {
                window.location.href = jsonres['url']
            })
            .catch((err) => console.log(err))
    }

    const handleClickReview = () => {
        setShow(true);
    }

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
            </CNavbar>
            
            <div className="home">
                <p className="topic">Contacts Manager</p>
                <p className="desc">View your Google contacts, insert new contacts and save them directly into your google account.</p>
            </div>
            <div className="btn-deck">
                <CButton color="primary" className="btn" onClick={handleClick}>
                    <Row>
                        <Col lg={1}>
                            <CImg src={googleicon} style={{ width: 30 }}></CImg>
                        </Col>
                        <Col style={{ marginLeft: 10, width: 150 }}>
                            <h4>Get Started</h4>
                        </Col>
                    </Row>
                </CButton>
                <CButton style={{ marginLeft: 10 }} color="secondary" className="btn" onClick={handleClickReview}>
                    <Row>
                        <Col>
                            <h4>Review Privacy Policy</h4>
                        </Col>
                    </Row>
                </CButton>
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="xl"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <h1>Privacy Policy.</h1>
                        <p>Last updated: October 05, 2020</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrivacyPolicy />
                </Modal.Body>
            </Modal>
            <Footer />
        </div>

    );
};

export default SignIn;