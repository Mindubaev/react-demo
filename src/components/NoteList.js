import React, { Component } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import {
    DeleteOutlined,
    EditOutlined,
  } from '@ant-design/icons';
import NewNoteForm from './NewNoteForm'

export default class NodeList extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedNote:null
        };
    }

    selectNote=note=>{
        this.setState({selectedNote:Object.assign({},note)});
    }

    resetSelectedNote=()=>{
        this.setState(Object.assign({},this.state,{
            selectedNote:null
        }));
    }

    render(){
        return (
            <div className="NodeList">
                {this.props.notes.map((note)=>{
                    return (this.state.selectedNote!==null && this.state.selectedNote.id===note.id)? 
                        (
                            <NewNoteForm key={note.id}
                                note={this.state.selectedNote} 
                                saveNote={this.props.saveNote}
                                resetSelectedNote={this.resetSelectedNote}
                            />
                        )
                        :(
                            <Card key={note.id} 
                                title={note.title} 
                                style={{margin:10}}
                                loading={this.props.featching}
                                actions={[
                                    <DeleteOutlined key={"delete"+note.id}
                                        onClick={()=>this.props.deleteNote(note)}
                                    />,
                                    <EditOutlined key={"edit"+note.id} onClick={()=>this.selectNote(note)}/>
                                ]}
                            >
                                {note.text}
                            </Card>
                        );
                })}
            </div>
        );
    }

  }

  NodeList.propTypes={
    notes:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
            title:PropTypes.string,
            text:PropTypes.string,
    })),
    saveNote:PropTypes.func.isRequired,
    deleteNote:PropTypes.func.isRequired,
    fetching:PropTypes.bool
  };