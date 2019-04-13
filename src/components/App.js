import React, { Component } from 'react';
import { Route, BrowserRouter, Link, NavLink  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';

import './App.css';
import Landing from './Landing';
import ShowSelected from './ShowSelected';

const { Header, Content, Footer } = Layout;

class App extends Component {
  // TODO responsive padding for mobile
  constructor(props) {
    super(props);

    this.responsivePadding = { padding: '0 50px' };
  }

  componentWillMount(){
    //this.setState({height: window.innerHeight + 'px'});
    if(window.innerWidth < 500 ) {
      this.responsivePadding = { padding: '0' };
    }
  }

  responsivePadding = { padding: '0 50px' };

  render() {

    return (
      <div className="App">
        <BrowserRouter>
        <Layout className="layout">
        
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              
              <Menu.Item key="1">
              <NavLink  to="/">
                Find
              </NavLink >
              </Menu.Item>
              

              
              <Menu.Item key="2">
              <NavLink  to="/stash">
                Stash
              </NavLink >
              </Menu.Item>

              {/* <Menu.Item key="3">nav 3</Menu.Item> */}
            </Menu>
          </Header>
          <Content style={this.responsivePadding}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Route exact path="/" 
                component={Landing} />
            <Route exact path="/stash" 
                component={ShowSelected} />
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Topher Dev ©2019
          </Footer>

        </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect()(App);
