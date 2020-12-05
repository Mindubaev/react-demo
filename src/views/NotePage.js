import React, { Component } from 'react';
import { Row,Col,Alert,Pagination } from 'antd';
import {NoteActions} from '../redux/actions/Note';
import {connect} from 'react-redux';
import {
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import NewNoteForm from '../components/NewNoteForm';
import NoteList from '../components/NoteList';

class NotePage extends Component{

    constructor(props){
        super(props);
        this.state={
            failNodeAction:false,
            message:"",
            numOfNotes:0,
            selectedPage:1
        };
    }

    saveNote=async (note)=>{
        if (note.id){
            return this.props.noteService.putNote(note).then(putNote=>{
                if (putNote){
                    this.props.updateNote(putNote);
                    this.setState(Object.assign({},this.state,{failNodeAction:false}));
                    return true;
                }else{
                    this.setState(Object.assign({},this.state,{
                        failNodeAction:true,
                        message:"Ошибка при обновлении записи"
                    }));
                    return false;
                }
            });
        }else{
            note.UserId=this.props.user.id;
            return this.props.noteService.postNote(note).then(postedNote=>{
                if (postedNote){
                    this.loadNotes(this.state.selectedPage);// this.props.addNote(postedNote);
                    this.setState(Object.assign({},this.state,{failNodeAction:false}));
                    return true;
                }else{
                    this.setState(Object.assign({},this.state,{
                        failNodeAction:true,
                        message:"Ошибка при создании записи"
                    }));
                    return false;
                }
            });
        }
    }

    deleteNote=async (note)=>{
        return this.props.noteService.deleteNote(note.id).then(deleted=>{
            if (deleted){
                this.setState(Object.assign({},this.state,{failNodeAction:false}));
                this.loadNotes(this.state.selectedPage);// this.props.deleteNote(note);
                return true;
            }
            else{
                this.setState(Object.assign({},this.state,{
                    failNodeAction:true,
                    message:"Ошибка при удалении записи"
                }));
                return false;
            }
        });

    }

    async loadNotes(page){
        this.props.setNotesFetching(true);
        let notes=await this.props.noteService.getNotes(this.props.sizeOfPage,page);
        let numOfNotes=await this.props.noteService.countNotes();
        this.props.setNotesFetching(false);
        if (notes!==null && numOfNotes!==null){
            this.props.updateNotes(notes);
            this.props.setFailed(false);
            this.setState(Object.assign({},this.state,{
                numOfNotes
            }));
        }
        else
            this.props.setFailed(true);
    }

    handlePageChange=(selectedPage)=>{
        this.setState(Object.assign({},this.state,{selectedPage}));
        this.loadNotes(selectedPage);
    }

    render(){
        return (
            <Row justify="center" className="NoteContainer">
                <Col span="16">
                    <NoteList notes={this.props.notes}
                        fetching={this.props.notesFetching}
                        saveNote={this.saveNote}
                        deleteNote={this.deleteNote}
                    />
                    <NewNoteForm saveNote={this.saveNote}/>

                    {(this.props.failedNotesFetching) &&
                        (
                            <Alert message="Ошибка при загрузке записей" type="error" />
                        )
                    }

                    {(this.state.failNodeAction) &&
                        (
                            <Alert message={this.state.message} type="error" />
                        )
                    }
                    <Row justify="center">
                        <Pagination defaultCurrent={1} 
                            pageSize={this.props.sizeOfPage} 
                            total={this.state.numOfNotes} 
                            onChange={this.handlePageChange}
                            style={{marginTop:10}}
                        />
                    </Row>
                </Col>
            </Row>
        );
    }

    async componentDidMount(){
        this.loadNotes(this.state.selectedPage);
    }

}

function actionMapper(dispatch){
    return {
        setNotesFetching:bool=>dispatch(NoteActions.setNotesFetching(bool)),
        updateNotes:userId=>dispatch(NoteActions.updateNotes(userId)),
        setFailed:bool=>dispatch(NoteActions.setFailedNotesFetching(bool)),
        deleteNote:note=>dispatch(NoteActions.deleteNote(note)),
        addNote:note=>dispatch(NoteActions.addNote(note)),
        updateNote:note=>dispatch(NoteActions.updateNote(note))
    };
}

function propMapper(state){
    return {
        noteService:state.noteService,
        user:state.user,
        notes:state.notes,
        notesFetching:state.notesFetching,
        failedNotesFetching:state.failedNotesFetching
    };
}

NotePage=connect(propMapper,actionMapper)(NotePage);
export default NotePage;