import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

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
    console.log(e);
    if(this.state.modalView === "show") {
        this.setState({
            modalView: 'tracks',
            modalBack: true
        });
    }
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
        modalVisible: false,
    });
    this.props.history.goBack();
  };

  renderTracksInfo(tracksData) {
    return tracksData.map((track, index) => {
        return (
            <div key={index} style={{fontSize: "8px"}} onClick={() => this.trackClick(track.show_id)} >
                {track.title} &nbsp; {track.show_date} &nbsp; {track.venue_name} &nbsp; {track.location}
            </div>
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
          return (this.renderTracksInfo(tracksData));
      } else if(this.state.modalView === "show") {
          console.log(this.state.selectedShowId);
          let tracks = this.getTracksFromState(this.state.selectedShowId);
          return (<ShowDetails tracks={tracks} />);
      } else return (<p>Nothing to display</p>);
  }

  render() {
    let trackData = this.props.location.state.tracksData.data.extra;
    console.log(trackData);
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
          maskStyle={{background: "black"}}
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