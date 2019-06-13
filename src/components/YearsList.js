import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { fetchYears } from '../actions';
import ShowList from './ShowList';

const TabPane = Tabs.TabPane;

class YearsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
          mode: 'top',
          reMount: [],
          yearsLoadingText: 'Loading...'
        };
    }

    componentDidMount() {
        this.responsiveMode();
        if(!this.props.years.length > 0) {
            this.props.fetchYears()
                .catch(err => {
                    this.setState({ yearsLoadingText: 'Error fetching data. Please try again later.' });
                    throw err;
                })
        }
    }

    //// Handle api request time outs ////
    pushToRemountList = (year) => {
        this.setState({ reMount: [ ...this.state.reMount, year] });
    }
    removeFromRemountList = (year) => {
        let yearInt = parseInt(year);
        if(this.state.reMount.indexOf(yearInt) !== -1) {
            let filteredList = this.state.reMount.filter(val => val !== yearInt);
            this.setState({ reMount: filteredList });
        }
    }
    //// //// ////

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
        if(this.state.mode === "left") {
            tabBarWidth = {width: "50px"}; // 90px
            tabBarHeight = { minHeight: window.innerHeight - 100, height: "auto"};
        }
        if(this.props.years.length > 0) {
            return (
                <Tabs
                    defaultActiveKey="0"
                    tabPosition={this.state.mode}
                    style={tabBarHeight}
                    tabBarGutter={0}
                    tabBarStyle={tabBarWidth}
                    onTabClick={ (e)=> { this.removeFromRemountList(e) } }
                >
                    {this.renderYearsList()}
                </Tabs>
            );
        } else {
            return <p>{this.state.yearsLoadingText}</p>
        }
    }

    renderYearsList() {
        const reverseYears = [...this.props.years].reverse();
        return reverseYears.map((year, index) => {
            // Modify multi years to fit left tabs
            if(year === "1983-1987" && this.state.mode === "left") {
                year = <div>1983-<br/>1987</div>;
            }
            return (
                <TabPane tab={year} disabled={this.props.allowYearClick} key={index}>
                    {
                        this.state.reMount.indexOf(index) !== -1 ? <p>The request took longer than expected. Please try again.</p> : 
                        <ShowList year={year} yearIndex={index} pushRemount={this.pushToRemountList} 
                            removeFromRemount={this.removeFromRemountList} reMountList={this.state.reMount} /> 
                    }
                </TabPane>
            );
        });
    }

    render() {
        const { mode } = this.state;

        return (
            <div style={{  }}> 
                {/* <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                    <Radio.Button value="top">Horizontal</Radio.Button>
                    <Radio.Button value="left">Vertical</Radio.Button>
                </Radio.Group> */}
                {this.responsiveTabs()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { years: state.years, allowYearClick: state.allowYearClick };
};

export default connect(mapStateToProps, { fetchYears })(YearsList);