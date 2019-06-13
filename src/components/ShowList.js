import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Checkbox, Spin } from 'antd';
import moment from 'moment';

import { selectShow, fetchShowsInYear, allowYearClickToggle } from '../actions';
import ShowDetails from './ShowDetails';

const Panel = Collapse.Panel;

const customPanelStyle = {
    // fontSize: "12px",
    padding: 0,
    background: "#f7f7f7",
    overflow: "hidden"
};

class ShowList extends Component {

  componentDidMount() {
    // Fetch shows only if coming from YearsList (year prop is present)
    if (this.props.year && this.props.shows) {
        if (this.props.shows.filter(show => show.yearId === this.props.year).length === 0) {
            this.fetchShowsInYear();
        }
    }
  }

  fetchShowsInYear() {
    // Do not allow clicking of other years until current is loaded.
    this.props.allowYearClickToggle();
    this.props.fetchShowsInYear(this.props.year)
      .then(() => {
        this.props.allowYearClickToggle();
      })
      .catch(err => {
        // If request times out add the year to reMount state. Component will unmount and retry fetch on subsequent clicks.
        this.props.allowYearClickToggle();
        this.props.pushRemount(this.props.yearIndex);
        throw err;
      });
  }

  onCheckboxChange(e, show) {
    this.props.selectShow(show);
  }

  showSelectedCheck(id) {
    if (this.props.selectedShows.includes(id)) {
      return true;
    }
    return false;
  }

  renderShowCheckBox(show) {
    return (
      <Checkbox
        onClick={e => {
          e.stopPropagation();
          this.onCheckboxChange(e, show);
        }}
        checked={this.showSelectedCheck(show)}
      />
    );
  }

  formatDate(date) {
    return  moment(date, "YYYY-MM-DD").format("MM-DD-YYYY");
  }

  renderShowPanel(show) {
    return (
      <div key={show.id}>
        <Collapse defaultActiveKey="1">
          <Panel
            header={`${this.formatDate(show.date)} ${show.venue_name}: ${show.location}`}
            key={show.id}
            extra={this.renderShowCheckBox(show)}
            style={customPanelStyle}
          >
            <ShowDetails tracks={show.tracks} />
          </Panel>
        </Collapse>
      </div>
    );
  }

  renderList() {
      // Determine if YearList render or SelectedShows (if YearList year prop will be present)
      if (this.props.year && this.props.shows) {
        const reverseShows = [...this.props.shows].reverse();
            return reverseShows
              .filter(show => show.yearId === this.props.year)
              .map(show => {
                return this.renderShowPanel(show);
              });
      }
      // SelectedShows:
      if (this.props.selectedShows.length > 0) {
            return this.props.selectedShows.map(show => {
                return this.renderShowPanel(show);
            });
      }
      return <p>No Shows Selected</p>
  }

  render() {
    return (
      <div>
        { !(this.props.allowYearClick) ? this.renderList() : <div style={{textAlign: "center", marginTop: "20px"}}><Spin /></div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {shows: state.shows, selectedShows: state.selectedShows, allowYearClick: state.allowYearClick};
}

export default connect(mapStateToProps, {selectShow, fetchShowsInYear, allowYearClickToggle} )(ShowList);