import React, { Component } from 'react';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import { Layout,Menu,Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {UserActions} from './redux/actions/User';
import Hellow from "./components/Hellow";
import LoginPage from "./views/LoginPage";
import NotePage from "./views/NotePage";
import UserPage from "./views/UserPage";
import { connect } from 'react-redux';

class App extends Component {
  
  constructor (props){
    super(props);
    this.state={
    };
  }

  handleLogoutUser=()=>{
    this.props.userService.logoutUser().then(logout=>{
      if (logout){
        this.props.updateUser(null);
        this.props.history.push("/login");
      }
    });
  }

 render(){
  const { Header, Footer, Content } = Layout;
  const { history } = this.props;
  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" selectable={false} >
            {(this.props.user) &&
              <Menu.Item key="1" 
                onClick={()=>this.props.history.push("/notes")}
              >
                Записи
              </Menu.Item>
            }
            {(this.props.user)?
              (
                <Menu.Item key="2" 
                  style={{float: 'right'}} 
                  onClick={this.handleLogoutUser}
                >
                  Выйти
                </Menu.Item>
              )
              :(
                <Menu.Item key="2" 
                  style={{float: 'right'}} 
                  onClick={()=>this.props.history.push("/login")}
                >
                  Войти
                </Menu.Item>
              )
            }
            {(this.props.user) &&
              (
                <Menu.Item key="3" 
                  style={{float: 'right'}} 
                  onClick={()=>this.props.history.push("/user")}
                >
                  <Avatar size="small" 
                    icon={
                      <UserOutlined />
                    } 
                  />
                </Menu.Item> 
              )
            }
          </Menu>
        </Header>
        <Content className="content" style={{minHeight: '90vh'}}>
            {(this.props.user)?
            <Switch>
              <Route history={history} path="/hellow">
                <Hellow />
              </Route>
              <Route history={history} path="/notes">
                <NotePage sizeOfPage={2} />
              </Route>
              <Route history={history} path="/user">
                <UserPage />
              </Route>
              <Redirect history={history} from="*" to="/hellow"/>
            </Switch>
            :
            <Switch>
              <Route history={history} path="/login" >
                <LoginPage/>
              </Route>
              <Redirect history={history} from="*" to="/login"/>
            </Switch>
            }
        </Content>
        <Footer style={{ textAlign: 'center' }}>React demo application</Footer>
      </Layout>
    </div>
  );
 }
  
}

function actionMapper(dispatch){
  return {
    updateUser:user=>dispatch(UserActions.updateUser(user))
  };
}

function propMapper(state){
  return {
      user:state.user,
      userService:state.userService
  };
}

App=connect(propMapper,actionMapper)(App);
export default withRouter(App);
