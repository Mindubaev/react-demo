import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import {
    EditOutlined,
    LoadingOutlined,
    InboxOutlined
} from '@ant-design/icons';
import { Alert,Form,Input,Button,Spin } from 'antd';
import { UserActions } from '../redux/actions/User';

function UserEditor(props){

    const [state,setState]=useState([
        {name:["username"],value:props.user.username},
        {name:["oldPassword"],value:""},
        {name:["password"],value:""}
    ]);
    const [fetching,setFetching]=useState(false);
    const [failed,setFailed]=useState(false);

    let getField=(name)=>{
        let fields=state.filter(e=>e.name.includes(name));
        if (fields.length>0)
            return fields[0];
        else
            return null
    }
    let setField=(name,value)=>{
        let oldField=getField(name);
        if (oldField)
            setState([
                ...state.filter(e=>!e.name.includes(name)),
                Object.assign({},oldField,{value})
            ]);
    }


    let setFields=(changedFields)=>{
        let changedFieldsName=[];
        for (let field of changedFields){
            for (let name of field.name){
                if (!changedFieldsName.includes(name))
                    changedFieldsName.push(name);
            }
        }

        let unchangedFields=[];
        for (let e of state){
            let find=true;
            for (let name of e.name){
                if (changedFieldsName.includes(name)){
                    find=false;
                    break;
                }
            }
            if (find)
                unchangedFields.push(e);
        }
        setState([
            ...unchangedFields,
            ...changedFields
        ]);
    }

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

    let onFinish=async ()=>{
        let user={
            id:props.user.id,
            username:getField("username").value,
            password:getField("password").value,
        }
        if (user.username===props.user.username)
            user.oldPassword=getField("oldPassword").value;
        setFetching(true);
        user=await props.userService.putUser(user);
        setFetching(false);
        if (user){
            setFailed(false);
            props.updateUser(user);
            setFields([
                {name:["username"],value:user.username},
                {name:["oldPassword"],value:""},
                {name:["password"],value:""}
            ]);
        }else
            setFailed(true);
    }

    let handeleUsernameChange=(event)=>{
        let username=event.target.value;
        let password=getField("password").value;
        let oldPassword=getField("oldPassword").value;
        if (props.user.username===getField("username").value && username!==props.user.username){
            password=oldPassword;
            oldPassword="";
        }else if (props.user.username!==getField("username").value && username===props.user.username){
            oldPassword=getField("password").value;
            password="";
        }
        setFields([
            {name:["username"],value:username},
            {name:["password"],value:password},
            {name:["oldPassword"],value:oldPassword}
        ]);
    }

    let handleOldPassword=event=>{
        let val=event.target.value;
        setField("oldPassword",val);
    }

    let handlePassword=event=>{
        let val=event.target.value;
        setField("password",val);
    }

    return (
        <Form
            {...layout}
            name="basic"
            fields={state}
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
                <Input
                    onChange={(e)=>handeleUsernameChange(e)} 
                />
            </Form.Item>

            {(props.user.username===getField("username").value) &&
            <Form.Item
                label="Old password"
                name="oldPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your old password!',
                    },
                ]}
            >
                <Input.Password onChange={(e)=>handleOldPassword(e)} />
            </Form.Item>
            }

            <Form.Item
                label={(getField("username").value===props.user.username)?"New password":"Password"}
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
                    },
                ]}
            >
                <Input.Password onChange={(e)=>handlePassword(e)}/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                {(fetching)?
                    (
                        <Spin indicator={
                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                        } />
                    ):(
                        <Button type="primary" 
                            htmlType="submit"
                            onClick={onFinish}
                        >
                            Edit
                        </Button>
                    )
                }
            </Form.Item>
            {
                (failed) &&
                (
                    <Form.Item {...tailLayout}>
                        <Alert message="Неверный логин или пароль" type="error" />
                    </Form.Item>
                )
            }
        </Form>
    );
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

UserEditor=connect(propMapper,actionMapper)(UserEditor);
export default UserEditor;