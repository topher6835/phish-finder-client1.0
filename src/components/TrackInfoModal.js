import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import moment from 'moment';

import ShowDetails from './ShowDetails';

class TrackInfoModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: true,
            modalView: "tracks",
            modalBack: true,
            selectedShowId: ""
        };
        this.getModalView = this.getModalView.bind(this);
    }

  showModal = () => {
    this.setState({
        modalVisible: true
    });
  };

  handleOk = e => {
    if(this.state.modalView === "show") {
        this.setState({
            modalView: 'tracks',
            modalBack: true
        });
    }
  };

  handleCancel = e => {
    this.setState({
        modalVisible: false,
    });
    this.props.history.goBack();
  };

  formatDate(date) {
    return  moment(date, "YYYY-MM-DD").format("MM-DD-YYYY");
  }

  renderTracksInfo(tracksData) {
    return tracksData.map((track, index) => {
        return (
          <li className="trackModalLI" key={index} style={{ cursor: "pointer", fontSize: "13px" }} onClick={() => this.trackClick(track.show_id)}>
            {track.title}: <span style={{ color: "blue" }}>{this.formatDate(track.show_date)} {track.venue_name} </span>
          </li>
        )
    })
  }

  trackClick(showId) {
      if(this.state.modalView === "tracks") {
          this.setState({
            modalView: 'show',
            modalBack: false,
            selectedShowId: showId
          });
      }
  }

  getTracksFromState(showId) {
    let selectedShow = this.props.selectedShows.filter(show => show.id === showId);
    return selectedShow[0].tracks;
  }

  getModalView (tracksData) {
      if(this.state.modalView === "tracks") {
          return (<ul style={{ display: "inline-grid", listStyle: "none" }}>{this.renderTracksInfo(tracksData)}</ul>);
      } else if(this.state.modalView === "show") {
          let tracks = this.getTracksFromState(this.state.selectedShowId);
          return (<ShowDetails tracks={tracks} />);
      } else return (<p>Nothing to display</p>);
  }

  render() {
    let trackData = this.props.location.state.tracksData.data.extra;
    return (
      <div>
        <Modal
          title="Track Info"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          okText={"Back"}
          okButtonProps={{ disabled: this.state.modalBack }}
          onCancel={this.handleCancel}
          cancelText={"Close"}
          maskStyle={{background: "rgb(41,49,112)"}}
          bodyStyle={{ padding: '12px'}}
        >
            {this.getModalView(trackData)}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return { selectedShows: state.selectedShows }
};

export default connect(mapStateToProps)(TrackInfoModal);