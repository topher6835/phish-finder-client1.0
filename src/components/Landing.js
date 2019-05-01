import React, { Component } from 'react';

import YearsList from './YearsList';

class Landing extends Component {

    render() {
        return (
            <div>
                <h1>Phish Finder</h1>
                <YearsList />
            </div>
        );
    }
}

export default Landing;