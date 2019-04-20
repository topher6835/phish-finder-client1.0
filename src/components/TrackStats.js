import React, { Component } from 'react';
import { connect } from 'react-redux';

class TrackStats extends Component {

    render() {
        console.log(this.props.location.state.tracksData.data.extra);
        return (<div><h1>track stats</h1> <br/> <p>{}</p></div>)
    }
}

export default connect()(TrackStats);