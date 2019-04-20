import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import ShowList from './ShowList';
import CompareTracks from './CompareTracks';
import { removeAllshows } from '../actions';

class CompareSelected extends Component {

    render() {

        let buttonDisabled = () => {
            if(this.props.selectedShows.length <= 0) {
                return true;
            }
            return false;
        };

        return (
            <div>
                <h1>Selected Shows</h1>
                <ShowList />
                <Button type="primary" size={"small"} disabled={buttonDisabled()} onClick={() => this.props.removeAllshows()} >Remove All</Button>
                &nbsp;
                <Button type="primary" size={"small"} disabled={true} >Save to My History</Button>
                <br />
                <br />
                <CompareTracks />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { shows: state.shows, selectedShows: state.selectedShows }
};

export default connect(mapStateToProps, { removeAllshows })(CompareSelected);