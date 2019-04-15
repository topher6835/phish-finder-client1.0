import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';

import { selectShow, fetchShowsInYear } from '../actions';

class ShowList extends Component {

    componentDidMount() {
        console.log("showList didmount");

        if(this.props.year) {
            if(this.props.shows) {
                if (this.props.shows.filter(e => e.yearId === this.props.year).length === 0) {
                    console.log("year not in state");
                    this.props.fetchShowsInYear(this.props.year);
                }
            }
            
            //this.props.fetchShowsInYear(this.props.year);
        } 
    }

    onChange(e, showId) {
        this.props.selectShow(showId);
    }

    showSelectedCheck(id) {
        if(this.props.selectedShows.includes(id)) {
            return true;
        }
        return false;
    }

    renderList() {
        if(this.props.shows) {
            return this.props.shows.map((show) => {
                if(show.yearId === this.props.year) {
                    return (
                        <div key={show.id}>
                            <p>
                                {show.date} {show.venueName} {show.location} 
                                <Checkbox 
                                    value={show.id} onChange={(e) => this.onChange(e, show.id)} 
                                    checked={this.showSelectedCheck(show.id)}
                                >
                                </Checkbox> 
                            </p>
                        </div>
                    );
                }
            });
        }
        return;
    }

    render() {
        return <div>{this.renderList()}</div>
    }
}

const mapStateToProps = (state) => {
    return {shows: state.shows, selectedShows: state.selectedShows};
}

export default connect(mapStateToProps, {selectShow, fetchShowsInYear} )(ShowList);