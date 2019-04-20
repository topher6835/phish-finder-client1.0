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

//   renderShowDetails(setArray) {
//     return setArray.map(set => {
//       return (
//         <div key={set}>
//           <div className="col">
//             <p style={{ fontSize: "9px", margin: "4px 0px", padding: 0 }}>
//               <b>{set}</b>
//             </p>
//             {this.renderTrackBySet(set)}
//           </div>
//         </div>
//       );
//     });
//   }

//   renderItemList = (item, index) => {
//     let trackArray = [];

//     this.props.tracks.map(track => {
//       if (track.set_name === item) {
//         trackArray.push(track);
//       }
//     });

//     return (
//       <List.Item>
//         <Card style={{ width: 200, margin: 0, padding: 0 }} title={item}>
//           {this.formatTracks(trackArray)}
//         </Card>
//       </List.Item>
//     );
//   };

//   formatTracks(tracks) {
//     return tracks.map(track => {
//       return (
//         <p style={{ margin: 0 }}>
//           <span style={{ fontSize: "8px", padding: 0, margin: 0 }}>
//             {track.title}
//           </span>
//           <span style={{ fontSize: "8px", float: "right", marginLeft: "6px" }}>
//             {this.msToTime(track.duration)}
//           </span>
//         </p>
//       );
//     });
//   }

//   renderShowDetailsCard(setArray) {
//     let setNames = setArray;
//     console.log(setNames.toString());
//     return (
//       <List
//         grid={{gutter: 10, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,}}
//         dataSource={setNames}
//         renderItem={this.renderItemList}
//       />
//     );
//   }

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