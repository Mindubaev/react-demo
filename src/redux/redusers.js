import {UserActionTypes} from "./actions/User";
import {NoteActionTypes} from './actions/Note';
import {MessageActionType} from './actions/Message';
import UserService from '../services/UserService';
import NoteService from '../services/NoteService';
import MessageService from '../services/MessageService';

const URL="http://localhost:9000";
const WS_URL="ws://localhost:9000";

const initialState={
    userService:new UserService(URL),
    noteService:new NoteService(URL),
    messageService:new MessageService(URL,WS_URL),
    user:sessionStorage.getItem("user")? 
        JSON.parse(sessionStorage.getItem("user")) 
        : null,
    notes:[],
    messages:[],
    failMessagesFetching:false,
    userFetching:false,
    failedUserFetching:false,
    notesFetching:false,
    failedNotesFetching:false,
    url:URL
};

function userReducer(user={},action){
    switch (action.type){
        case (UserActionTypes.UPDATE_USER):
            return action.user;
        default:
            return user;
    }
}

function userFetchingReducer(userFetching=false,action){
    switch(action.type){
        case (UserActionTypes.SET_USER_FETCHING):
            return action.isFetching;
        default:
            return userFetching;
    }
}

function failedUserFetchingReducer(failedUserFetching=false,action){
    switch(action.type){
        case (UserActionTypes.SET_FAILED_USER_FETCHING):
            return action.isFailed;
        default:
            return failedUserFetching;
    }
}

function notesReducer(notes=[],action){
    switch(action.type){
        case (NoteActionTypes.UPDATE_NOTES):
            return action.notes;
        case (NoteActionTypes.ADD_NOTE):
            return [...notes,action.note];
        case (NoteActionTypes.DELETE_NOTE):
            return notes.filter(note=>note.id!==action.note.id);
        case (NoteActionTypes.UPDATE_NOTE):
            return notes.map((note)=>(note.id===action.note.id)?
                action.note
                : note
            );
        default:
            return notes;
    }
}

function notesFetchingReducer(notesFetching=false,action){
    switch(action.type){
        case(NoteActionTypes.SET_NOTES_FETCHING):
            return action.fetching;
        default:
            return notesFetching;
    }
}

function failedNotesFetchingReducer(failedNotesFetching=false,action){
    switch(action.type){
        case(NoteActionTypes.SET_FAILED_NOTES_FETCHING):
            return action.failed;
        default:
            return failedNotesFetching;
    }
}

function messagesReducer(messages=[],action){
    switch(action.type){
        case (MessageActionType.UPDATE_MESSAGES):
            return action.messages;
        case (MessageActionType.ADD_MESSAGE):
            return [...messages,action.message];
        default:
            return messages;
    }
}

function failMessagesFetchingReducer(failMessagesFetching=false,action){
    switch(action.type){
        case(MessageActionType.SET_FAIL_MESSAGES_FETCHING):
            return action.failed;
        default:
            return failMessagesFetching;
    }
}

export default function reduce(state=initialState,action){
    return {
        url:state.url,
        userService:state.userService,
        noteService:state.noteService,
        messageService:state.messageService,
        user:userReducer(state.user,action),
        userFetching:userFetchingReducer(state.userFetching,action),
        failedUserFetching:failedUserFetchingReducer(state.failedUserFetching,action),
        notes:notesReducer(state.notes,action),
        notesFetching:notesFetchingReducer(state.notesFetching,action),
        failedNotesFetching:failedNotesFetchingReducer(state.failedNotesFetching,action),
        messages:messagesReducer(state.messages,action),
        failMessagesFetching:failMessagesFetchingReducer(state.failMessagesFetching,action)
    };
}