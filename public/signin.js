import { CButton, CImg } from '@coreui/react';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import icon from './extra/google.png';

const SignIn = () => {
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    const handleClick = (e) => {
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

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to={url} />
        }
    }

    return (
        <div>
            <CButton color="secondary" shape="pill" style={{ width: 250 }} onClick={handleClick}>
                <CImg src={icon} style={{ width: 30, marginRight: 10 }}></CImg>
                <h4>Sign In</h4>
            </CButton>
            { renderRedirect()}
        </div>
    );
};

export default SignIn;