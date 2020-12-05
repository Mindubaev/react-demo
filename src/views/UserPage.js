import React from 'react';
import { Row,Col,Card,PageHeader } from 'antd';
import UserImageEditor from '../components/UserImageEditor';
import { withRouter } from 'react-router-dom';
import UserEditor from "../components/UserEditor";

function UserPage(props){

    return (
    <Row justify="center">
        <Col span="16">

            <PageHeader
                className="site-page-header"
                onBack={() => props.history.push("/hellow")}
                title="Profile"
                subTitle="Edit your profile."
            />

            <Card>
            <Row justify="center" >
                <Col span="12">

                    <UserImageEditor types=".png"/>
                    
                </Col>
                <Col span="12">

                    <UserEditor/>

                </Col>
            </Row>
            </Card>
        </Col>
    </Row>
    );
}

UserPage=withRouter(UserPage);
export default UserPage;