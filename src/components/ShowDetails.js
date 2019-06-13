import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowDetails extends Component {
  constructor(props) {
    super();

    this.state = {
      responsiveMinWidth: "260px",
      responsiveFontSize: ""
    };
  }

  componentDidMount() {
    this.createSetsArray();
    this.responsiveMode();
  }

  msToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 1 ? "" : hours + ":";
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + minutes + ":" + seconds;
  }

  responsiveMode() {
    if (window.innerWidth < 500) {
      this.setState({
        responsiveMinWidth: "230px",
        responsiveFontSize: "12px"
      });
    }
  }

  createSetsArray() {
    const showTracks = this.props.tracks;

    let uniqueSets = showTracks
      .map(track => track.set_name)
      .filter((value, index, self) => self.indexOf(value) === index);

    return uniqueSets;
  }

  renderTrackBySet(set) {
    return this.props.tracks
      .filter(track => track.set_name === set)
      .map(track => {
        let trackTime = this.msToTime(track.duration);
        return (
          <li
            key={track.id}
            style={{
              minWidth: this.state.responsiveMinWidth,
              fontSize: this.state.responsiveFontSize
            }}
          >
            {track.title}
            <span
              style={{
                // fontSize: "8px",
                float: "right",
                marginLeft: "6px",
                paddingRight: "6px"
              }}
            >
              {trackTime}
            </span>
          </li>
        );
      });
  }

  render() {
    let setArray = this.createSetsArray();

    return setArray.map(set => {
      return (
        <ul
          style={{
            display: "inline-grid",
            listStyle: "none",
            verticalAlign: "top",
            padding: 0
          }}
          key={set}
        >
          <span style={{ fontWeight: "bold" }}>{set}</span>{" "}
          {this.renderTrackBySet(set)}
        </ul>
      );
    });
  }
}

export default connect()(ShowDetails);
