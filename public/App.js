import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './home';
import SignIn from './signin';
import PrivacyPolicy from './extra/privacypolicy';

const App = () => {
    return (
        <Router>
            <Route exact path="/" component={SignIn} />
            <Route path="/home" component={Home} />
            <Route path="/privacy-policy-note" component={PrivacyPolicy} />
        </Router>
    );
};

render(<App />, document.getElementById('root'));