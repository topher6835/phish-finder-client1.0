import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'antd';

class CompareTracks extends Component {

    collectTracks() {
        let trackCollection = [];
        this.props.selectedShows.map(show => ( 
                show.tracks.map(track => (
                    trackCollection.push(track)
                ))
            )
        );
        return trackCollection;
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

    countTracks() {
        let tracksArray = this.collectTracks();
        let count = {};
        let durationFormatted;
        const jamSongId = 412;

        tracksArray.forEach( function(track) {
            let counter = 1;
            let trackTitle = track.title;
            let extraInfo = [];
            durationFormatted = this.msToTime(track.duration);

            if(count[track.song_id] && count[track.song_id]['count']) {
                counter = ( count[track.song_id]['count'] ) + 1;

                if(track.song_id === jamSongId) {
                    trackTitle = "Jam";
                }
                if(count[track.song_id]['extra'] && count[track.song_id]['extra'].length > 0) {
                    extraInfo.push(...count[track.song_id]['extra'] );
                }
            }
            extraInfo.push({track_id: track.id, title: track.title, duration: durationFormatted, show_date: track.show_date});

            count[track.song_id] = { count: counter, title: trackTitle, extra: extraInfo};
        }.bind(this));

        let tracksWithCount = Object.keys(count).map((k) => {
            return {
                song_id: k, count: count[k]['count'], title: count[k]['title'], 
                extra: count[k]['extra']
            };
        });

        return tracksWithCount;
    }

    sortTracks(tracks) {
        let sortByTrack2 = tracks.sort(function(track1, track2) {
            if(track1.count > track2.count) return -1;
            if(track1.count < track2.count) return 1;

            if(track1.title > track2.title) return 1;
            if(track1.title < track2.title) return -1;
        });
        return sortByTrack2;
    }

    render() {
        
        let trackData = this.sortTracks(this.countTracks());
        if(trackData.length > 0) {

            const data = [];

            const columns = [{
                title: "Song",
                dataIndex: 'title',
                render: (text, data, index) => <Link to={{pathname: "/songStats", state: { tracksData: data}}} >{text}</Link>
            }, {
                title: "Count",
                dataIndex: 'count'
            }, {
                dataIndex: 'data'
            }];

            trackData.map((track, index) => {
                return data.push({
                    key: index,
                    title: track.title,
                    count: track.count,
                    data: track
                })
            });

            return (
                <Row>
                    <Col span={12} offset={6}>
                        <Table columns={columns} dataSource={data} size={"small"} pagination={false} 
                            className={"antTrackTable"} rowClassName={"antTrackCompareRow"} />
                    </Col>
                </Row>
            )


            // return trackData.map(track => {
            //     return (
            //         <div key={track.song_id} style={{display: "inline-block"}}>
            //             <p style={{ fontSize: "8px", padding: 0, margin: 0 }}>
            //                 {track.title}
            //             <span
            //                 style={{
            //                 fontSize: "8px",
            //                 float: "right",
            //                 marginLeft: "6px",
            //                 paddingRight: "6px"
            //                 }}
            //             >
            //             {track.count}
            //             </span>
            //             </p>
            //         </div>
            //     )
            // });
        } else {
            return (<div>Compare Tracks</div>)
        }
    }
}

const mapStateToProps = (state) => {
    return { shows: state.shows, selectedShows: state.selectedShows }
};

export default connect(mapStateToProps)(CompareTracks);
