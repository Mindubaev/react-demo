import React from 'react';
import {Button, Row, Col,Result,Carousel,Card,List,Comment,Input,} from 'antd';
import {withRouter} from 'react-router-dom';
import {
    SendOutlined
  } from '@ant-design/icons';
  import Chat from './Chat';

class Hellow  extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return (
        <div>
            <Row justify="center" style={{marginTop:10}}>
                <Col span="8">
                            <Carousel autoplay centerMode={true} dotPosition='top' >
                            <Card style={{height:350,width:650}}
                                cover={
                                    <img src="https://dev-gang.ru/static/storage/303228676345307758728954892797531563850.jpeg"
                                    />
                                }
                            >
                                <p>React image 1</p>
                            </Card>
                            {/* <Card style={{height:350,width:650}}
                                cover={
                                    <img src={require("../images/react.jpg")} 
                                    />
                                }
                            >
                            </Card> */}
                            <Card style={{height:350,width:650}}
                                cover={
                                    <img src="https://www.bacancytechnology.com/blog/wp-content/uploads/2019/06/ezgif.com-crop-1.gif"
                                    />
                                }
                            >
                                <p>React image 2</p>
                            </Card>
                            </Carousel>
                            <Result
                                status="success"
                                title="Successfully log in react demo application!"
                                subTitle="You can manage notes or create new user."
                                extra={[
                            <Button type="primary" 
                                key="console"
                                onClick={()=>this.props.history.push("/notes")}
                            >
                                Go to notes
                            </Button>
                        ]}
                    />
                </Col>

                <Col span="6">
                    <Chat size={100} page={0}/>
                </Col>

            </Row>
        </div>
        );
    }

}

Hellow=withRouter(Hellow);
export default Hellow;