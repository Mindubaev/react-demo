import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import {
    EditOutlined,
    InboxOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import { Card,Upload,Alert } from 'antd';


function UserImageEditor(props){

    const [selectedImageUrl,setSelectedImageUrl]=useState(null);
    const [fileList,setFileList]=useState([]);
    const [fetching,setFetching]=useState(false);
    const [failed,setFailed]=useState(false);

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    let handleOnChange = async e => {
        let file=e.fileList[e.fileList.length-1];
        let url=null;
        if (file)
            url = await getBase64(file.originFileObj);
        setSelectedImageUrl(url);
    };

    let handleBeforeUpload=file => {
        if (file.type==="image/png")
            setFileList([file]);
        return false;
    }

    let handleOnRemove=file => {
        setFileList([]);
    }

    let handleImageUpload=async ()=>{
        if (fileList.length>0){
            setFetching(true);
            if (await props.userService.putUserImage(props.user.id,fileList[0])){
                setFailed(false);
                setFileList([]);
            }
            else
                setFailed(true);
            setFetching(false);
        }
    }

    return (
        <Card
            cover={
            <img
                alt="Profile picture"
                src={(selectedImageUrl)?selectedImageUrl:props.userService.url+"/user/"+props.user.id+"/image"}
            />
            }
            actions={[
                <EditOutlined key="edit" onClick={handleImageUpload}/>
            ]}
        >
            <Card
                title="Profile picture"
            >
                <Upload.Dragger name="image"
                    multiple={false}
                    accept={props.types}
                    onChange={handleOnChange}
                    onRemove={handleOnRemove}
                    beforeUpload={handleBeforeUpload}
                    fileList={fileList}
                >
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support png picture
                    </p>
                </Upload.Dragger>
                {(failed) &&
                    <Alert message="Изменения не были приняты" type="error" />
                }
            </Card>
            {(fetching) &&
                <LoadingOutlined style={{ fontSize: 24 }} spin />
            }
        </Card>
    );

}

function actionMapper(dispatch){
    return {
        
    };
}

function propMapper(state){
    return {
        user:state.user,
        userService:state.userService,
    };
}

UserImageEditor=connect(propMapper,actionMapper)(UserImageEditor);
export default UserImageEditor;