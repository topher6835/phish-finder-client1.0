import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Radio } from 'antd';
import { fetchYears } from '../actions';
import ShowList from './ShowList';

//import ShowList from './ShowList';
//import ShowSelected from './ShowSelected';
const TabPane = Tabs.TabPane;

class YearsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mode: 'top',
        };
    }

    componentDidMount() {
        this.responsiveMode();
        this.props.fetchYears();
    }

    handleModeChange = (e) => {
        const mode = e.target.value;
        this.setState({ mode });
    }

    responsiveMode() {
        if(window.innerWidth < 500 ) {
            this.setState({mode: 'left'});
          }
    }

    responsiveTabs() {
        let tabBarWidth = {};
        let tabBarHeight= {height: "auto"};
        // TODO adjust 100 offset after final styling
        if(this.state.mode === "left") {
            tabBarWidth = {width: "90px"};
            tabBarHeight = { minHeight: window.innerHeight - 100, height: "auto"};
        }
        return (
            <Tabs
                defaultActiveKey="1"
                tabPosition={this.state.mode}
                style={tabBarHeight} // height: 440
                tabBarGutter={0}
                tabBarStyle={tabBarWidth}
                onTabClick={ (e)=> console.log("click " + e) }
            >
                {this.renderYearsList()}
            </Tabs>
        );
    }

    renderYearsList() {
        const reverseYears = [...this.props.years].reverse();
        return reverseYears.map(year => {
            return (
                <TabPane tab={year} key={year}>
                    <ShowList year={year} />
                </TabPane>
            );
        });
    }

    render() {
        const { mode } = this.state;

        return (
            <div>
                <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                    <Radio.Button value="top">Horizontal</Radio.Button>
                    <Radio.Button value="left">Vertical</Radio.Button>
                </Radio.Group>
                {this.responsiveTabs()}
                <h1>Years List</h1>      
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { years: state.years };
};

export default connect(mapStateToProps, { fetchYears })(YearsList);