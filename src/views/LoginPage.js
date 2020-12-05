import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Form, Input, Button, Checkbox,Row,Col,Spin,Alert,Space } from 'antd';
import { connect } from 'react-redux';
import { UserActions } from '../redux/actions/User';
import { LoadingOutlined } from '@ant-design/icons';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type:null
        };

        this.onFinish=this.onFinish.bind(this);
        this.onFinishFailed=this.onFinishFailed.bind(this);
    }

    async onFinish(e){
        let username=e.username;
        let password=e.password;
        let user=null;
        if (this.state.type==="submit"){
            this.props.setUserFetching(true);
            user=await this.props.userService.loginUser(username,password);
            this.props.setUserFetching(false);
        }else if (this.state.type==="register"){
            this.props.setUserFetching(true);
            user=await this.props.userService.postUser({username,password});
            this.props.setUserFetching(false);
        }
        if (user){
            this.props.updateUser(user);
            this.props.setFailedUserFetching(false);
            this.props.history.push("/hellow");
        }else{
            this.props.setFailedUserFetching(true);
        }
        console.log(this.props.user);
    }

    onFinishFailed(e){
        console.log("auth failed");
    }

    handleChangeType=type=>{
        this.setState(Object.assign({},this.state,{
            type
        }))
    }

    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 8,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 8,
            },
        };

        return (
            <Row justify="center" className="loginContainer" style={{marginTop:20}}>
                <Col span="16">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input value={this.state.username}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password value={this.state.password}/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            {(this.props.userFetching)?
                                (
                                    <Spin indicator={
                                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                                    } />
                                ):(
                                    <Space>
                                        <Button type="primary" 
                                            htmlType="submit"
                                            onClick={()=>this.handleChangeType("submit")}
                                        >
                                            Submit
                                        </Button>
                                        <Button type="dashed" 
                                            htmlType="submit"
                                            onClick={()=>this.handleChangeType("register")}
                                        >
                                            Register
                                        </Button>
                                    </Space>
                                )
                            }
                        </Form.Item>
                        {
                            (this.props.failedUserFetching) &&
                            (
                                <Form.Item {...tailLayout}>
                                    <Alert message="Неверный логин или пароль" type="error" />
                                </Form.Item>
                            )
                        }
                    </Form>
                </Col>
            </Row>
        );
    }

}

function actionMapper(dispatch){
    return {
        updateUser:user=>dispatch(UserActions.updateUser(user)),
        setUserFetching:isFetching=>dispatch(UserActions.setUserFetching(isFetching)),
        setFailedUserFetching:isFailed=>dispatch(UserActions.setFailedUserFetching(isFailed)),
    };
}

function propMapper(state){
    return {
        user:state.user,
        userFetching:state.userFetching,
        failedUserFetching:state.failedUserFetching,
        userService:state.userService
    };
}

LoginPage=connect(propMapper,actionMapper)(LoginPage);
LoginPage=withRouter(LoginPage);
export default LoginPage;//!