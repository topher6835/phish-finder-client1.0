import React, { Component } from 'react';

import YearsList from './YearsList';
import CompareSelected from './CompareSelected';

class Landing extends Component {

    render() {
        return (
            <div>
                <h1>Phish Finder Landing</h1>
                <YearsList />
                {/* <CompareSelected /> */}
            </div>
        );
    }
}

export default Landing;