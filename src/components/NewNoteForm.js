import React, { Component } from 'react';
import {Card,Input } from 'antd';
import PropTypes from 'prop-types';
import {
    SaveOutlined,
    RollbackOutlined
  } from '@ant-design/icons';

export default class NewNoteForm extends Component{

    constructor(props){
        super(props);
        this.state={
            note:(props.note)?
            Object.assign({},props.note):
            {
                id:undefined,
                title:"",
                text:""
            }
        }
    }

    handleTitleChange=e=>this.setState(
        {note:Object.assign({},this.state.note,{title:e.target.value})
    });

    handleTextChange=e=>this.setState(
        {note:Object.assign({},this.state.note,{text:e.target.value})
    });

    handleSaveNote=()=>{
        this.props.saveNote(Object.assign({},this.state.note))
        .then(saved=>{
            if (saved){
                this.setState(Object.assign({},this.state,{
                    note:{
                        id:undefined,
                        title:"",
                        text:""
                    }
                }));
                if (this.props.resetSelectedNote)
                    this.props.resetSelectedNote();
            }
        });
    }

    render(){
        let icons=[];
        icons.push(
            <SaveOutlined key="save" 
                onClick={this.handleSaveNote}
            />
        );
        if (this.props.resetSelectedNote)
            icons.push(
                <RollbackOutlined key="back" 
                    onClick={this.props.resetSelectedNote}
                />
            );
        return(
            <Card title={
                    <Input placeholder="Заголовок" 
                        value={this.state.note.title}
                        maxLength={100}
                        onChange={this.handleTitleChange}
                    />
                } 
                actions={icons}
            >
                <Input.TextArea
                    placeholder="Содержимое..."
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    value={this.state.note.text}
                    maxLength={512}
                    onChange={this.handleTextChange}
                />        
            </Card>
        );
    }

}

NewNoteForm.propTypes={
    saveNote:PropTypes.func.isRequired,
    resetSelectedNote:PropTypes.func,
    note:PropTypes.shape({
        id:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        title:PropTypes.string,
        text:PropTypes.string
    })
};