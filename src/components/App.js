import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Badge, BackTop } from 'antd';

import './App.css';
import Landing from './Landing';
import CompareSelected from './CompareSelected';
import TrackInfoModal from './TrackInfoModal';

const { Header, Content, Footer } = Layout;

class App extends Component {
  // TODO responsive padding for mobile
  constructor(props) {
    super(props);

    this.state= {
      menuSelected: "1"
    };
    this.responsivePadding = { padding: '0 50px' };
  }

  componentWillMount(){
    if(window.innerWidth < 500 ) {
      this.responsivePadding = { padding: '0' };
    }
    this.setMenuSelected();
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
        this.setMenuSelected();
    }
  }

  setMenuSelected() {
    if(window.location.pathname === "/") {
      this.setState({ menuSelected: "1"});
      return;
    }
    if(window.location.pathname === "/stash") {
      this.setState({ menuSelected: "2"});
      return;
    }
    return;
  }

  selectedSize() {
    let count = this.props.selectedShows.length;
    return (
    <Badge showZero={false} count={count} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
    );
  }

  render() {

    return (
      <div className="App">
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[this.state.menuSelected]}
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key="1">
                  <NavLink to="/">Find</NavLink>
                </Menu.Item>

                <Menu.Item key="2">
                  <NavLink to="/stash">Compare {this.selectedSize()}</NavLink>
                </Menu.Item>

                <Menu.Item key="3" disabled>
                  My History
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={this.responsivePadding}>
              <div
                style={{ background: "#fff", padding: 24, minHeight: 280 }}
              >
                <Route exact path="/" component={Landing} />
                <Route exact path="/stash" component={CompareSelected} />
                <Route exact path="/trackInfoModal" component={TrackInfoModal} />
              </div>
            </Content>
            <div>
              <BackTop visibilityHeight={350} />
            </div>
            <Footer style={{ textAlign: "center" }}>
              topherdev00@gmail.com 2019
            </Footer>
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { selectedShows: state.selectedShows};
}

export default connect(mapStateToProps)(withRouter(App));
