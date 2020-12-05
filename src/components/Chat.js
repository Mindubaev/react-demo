import React, { useState,useEffect,useRef } from 'react';
import {connect} from 'react-redux';
import {MessageActions} from '../redux/actions/Message';
import {
    SendOutlined
  } from '@ant-design/icons';
import {Row, Col,Card,List,Comment,Input,Alert} from 'antd';

function Chat(props){

    const[failMessaging,setFailMessaging] = useState(false);
    const[text,setMessageText]= useState("");

    let handeleTextChange=(event)=>{
        setMessageText(event.target.value);
    };

    let sendMessage=(text,user)=>{
        props.messageService.sendMessageToChat({
            text,
            UserId:user.id
        }).then(send=>{
            if (send)
                setMessageText("");
            setFailMessaging(!send)}
        );
    };

    const scrollToBottom = () => {
        let chat=window.document.getElementById("chatContainer");
        chat.scrollTop=chat.scrollHeight;
      }

    useEffect(()=>{
        props.messageService.getMessages(props.size,props.page).then(messages=>{
            if (!messages){
                props.setFailMessagesFetching(true);
                messages=[];
            }else
                props.setFailMessagesFetching(false);
            props.updateMessages(messages);
        });
    },[]);

    useEffect(()=>{
        let  handleMessage=(event)=>{
            let message=JSON.parse(event.data);
            props.addMessage(message);
            console.log(event.data);
        }
        props.messageService.connectToChat(handleMessage);
        return ()=>{
            props.messageService.disconnectFromChat();
        }
    },[]);

    useEffect(()=>{
        scrollToBottom()
    },[props.messages]);

    return (
        <Card className="chatContainer"
            actions={[
                <Row style={{marginLeft:5}}>
                <Col span="18">
                    <Input.TextArea placeholder="Some thoughts?" 
                        autoSize 
                        onChange={(e)=>handeleTextChange(e)}
                        value={text}
                    />
                </Col>
                <Col span="6">
                    <SendOutlined key="send" 
                        size="" 
                        style={{marginLeft:"2vh",fontSize: '26px'}}
                        onClick={()=>sendMessage(text,props.user)}
                    />
                </Col>
            </Row>
            ]}
            title="Global chat"
        >
            <List id="chatContainer" size="small"
                bordered
                style={{overflowY:"scroll",maxHeight:"60vh"}}
                dataSource={props.messages}
                renderItem={message => 
                <List.Item>
                    <Comment
                        avatar={props.url+"/user/"+message.user.id+"/image"}
                        author={message.user.username}
                        content={<p>{message.text}</p>}
                    />
                </List.Item>
                }
            />

            {(props.failMessagesFetching) &&
                (
                    <Alert message="Ошибка при загрузке сообщений" type="error" />
                )
            }
            {(failMessaging) &&
                (
                    <Alert message="Ошибка при отправки сообщения" type="error" />
                )
            }

        </Card>
    );
}

function actionMapper(dispatch){
    return {
        setFailMessagesFetching:bol=>dispatch(MessageActions.setFailMessagesFetching(bol)),
        updateMessages:messages=>dispatch(MessageActions.updateMessages(messages)),
        addMessage:message=>dispatch(MessageActions.addMessage(message))
    };
}

function propMapper(state){
    return {
        url:state.url,
        user:state.user,
        messages:state.messages,
        failMessagesFetching:state.failMessagesFetching,
        messageService:state.messageService
    };
}

Chat=connect(propMapper,actionMapper)(Chat);
export default Chat;