import React, { Component } from 'react';

import YearsList from './YearsList';

class Landing extends Component {

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Phish Finder</h1>
                <p>Select a year to view shows performed in that year. Expand a show to view its set list.
                    Multiple shows can be checked to compare and view song information.</p>
                <YearsList />
            </div>
        );
    }
}

export default Landing;