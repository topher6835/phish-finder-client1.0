import React, { Component } from 'react';

import YearsList from './YearsList';
import ShowList from './ShowList';
import ShowSelected from './ShowSelected';

class Landing extends Component {

    render() {
        return (
            <div>
                <h1>Landing Component</h1>
                <YearsList />
                <ShowList />
                <ShowSelected />
            </div>
        );
    }
}

export default Landing;