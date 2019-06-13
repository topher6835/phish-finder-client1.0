import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Badge, BackTop, Icon } from 'antd';

import './App.css';
import Landing from './Landing';
import CompareSelected from './CompareSelected';
import TrackInfoModal from './TrackInfoModal';

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      menuSelected: "1"
    };
    this.contentResponsivePadding = { padding: '0 50px' };
    this.headerResponsivePadding = { padding: '0 50px', backgroundColor: 'rgb(41,49,112)' };
  }

  componentWillMount(){
    if(window.innerWidth < 500 ) {
      this.contentResponsivePadding = { padding: '0' };
      this.headerResponsivePadding = { padding: '0', margin: '0' };
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
    if(window.location.pathname === "/compare") {
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
            <Header style={this.headerResponsivePadding}>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[this.state.menuSelected]}
                style={{ lineHeight: "64px", backgroundColor: 'rgb(41,49,112)' }}
              >
                <Menu.Item key="1" className="customSelected" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                  <NavLink to="/">Find</NavLink>
                </Menu.Item>

                <Menu.Item key="2" className="customSelected" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                  <NavLink to="/compare">Compare {this.selectedSize()}</NavLink>
                </Menu.Item>

                <Menu.Item key="3" className="customSelected" style={{ paddingLeft: '10px', paddingRight: '10px' }} disabled>
                  My History
                </Menu.Item>

                <SubMenu title={<span><Icon type="bars" style={{ fontSize: '26px' }} /></span>} key="sub1" style={{float: "right"}}>
                  <Menu.Item key="sub1" disabled>Sign In</Menu.Item>
                  <Menu.Item key="sub2" disabled>About</Menu.Item>
                </SubMenu>
              </Menu>
            </Header>
            <Content style={this.contentResponsivePadding}>
              <div
                style={{ background: "#fff", padding: 24, minHeight: 'calc(100vh - 64px)' }} // minHeight: 280
              >
                <Route exact path="/" component={Landing} />
                <Route exact path="/compare" component={CompareSelected} />
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
