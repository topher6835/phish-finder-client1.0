import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowDetails extends Component {
  componentDidMount() {
    this.createSetsArray();
  }

  msToTime(duration) {
    //let milliseconds = parseInt((duration % 1000) / 100);
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 1 ? "" : hours + ":";
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + minutes + ":" + seconds;
  }

  createSetsArray() {
    const showTracks = this.props.tracks;

    let uniqueSets = showTracks.map(track => track.set_name)
    .filter((value, index, self) => self.indexOf(value) === index);

   return uniqueSets;
  }

  renderTrackBySet(set) {
    return this.props.tracks
      .filter(track => track.set_name === set)
      .map(track => {
        let trackTime = this.msToTime(track.duration);
        return (
          <div key={track.id}>
            <p style={{ fontSize: "8px", padding: 0, margin: 0 }}>
              {track.title}
              <span
                style={{
                  fontSize: "8px",
                  float: "right",
                  marginLeft: "6px",
                  paddingRight: "6px"
                }}
              >
                {trackTime}
              </span>
            </p>
          </div>
        );
      });
  }

  render() {
    let setArray = this.createSetsArray();

    return setArray.map(set => {
      return (
        <div style={{ display: "inline-block", verticalAlign: "top" }} key={set}>
          <span style={{ fontSize: "10px", fontWeight: "bold" }}>{set}</span>
          {this.renderTrackBySet(set)}
        </div>
      );
    });

  }
}

export default connect()(ShowDetails);