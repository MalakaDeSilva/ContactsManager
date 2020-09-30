import { CButton, CImg } from '@coreui/react';
import React from 'react';
import icon from './extra/google.png';

const SignIn = () => {
    return (
        <div>
            <CButton color="secondary" shape="pill" style={{ width: 250 }}>
                <CImg src={icon} style={{ width: 30, marginRight: 10 }}></CImg>
                <h4>Sign In</h4>
            </CButton>
        </div>
    );
};

export default SignIn;