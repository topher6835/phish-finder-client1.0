import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowSelected extends Component {

    returnSelected() {
        return this.props.selectedShows.map(show => {
                return (<p key={show}>{show}</p>);
            });
    }

    render() {
        console.log(this.props.selectedShows);

        return (
            <div>
                {this.returnSelected()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { selectedShows: state.selectedShows }
};

export default connect(mapStateToProps)(ShowSelected);