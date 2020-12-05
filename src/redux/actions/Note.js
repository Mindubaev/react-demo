const UPDATE_NOTES='UPDATE_NOTES';
const SET_NOTES_FETCHING='SET_NOTES_FETCHING';
const SET_FAILED_NOTES_FETCHING='SET_FAILED_NOTES_FETCHING';
const UPDATE_NOTE='UPDATE_NODE';
const DELETE_NOTE='DELETE_NOTE';
const ADD_NOTE='ADD_NOTE';

export const NoteActionTypes={UPDATE_NOTES,UPDATE_NOTE,SET_NOTES_FETCHING,SET_FAILED_NOTES_FETCHING,DELETE_NOTE,ADD_NOTE};

function updateNotes(notes){
    return {
        type:UPDATE_NOTES,
        notes
    };
}

function updateNote(note){
    return {
        type:UPDATE_NOTE,
        note
    };
}

function setNotesFetching(fetching){
    return {
        type:SET_NOTES_FETCHING,
        fetching
    };
} 

function setFailedNotesFetching(failed){
    return {
        type:SET_FAILED_NOTES_FETCHING,
        failed
    };
}

function deleteNote(note){
    return {
        type:DELETE_NOTE,
        note
    };
}

function addNote(note){
    return {
        type:ADD_NOTE,
        note
    };
}

export const NoteActions={updateNotes,updateNote,setNotesFetching,setFailedNotesFetching,deleteNote,addNote};