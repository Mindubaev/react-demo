const UPDATE_MESSAGES='UPDATE_MESSAGES';
const ADD_MESSAGE='ADD_MESSAGE';
const SET_FAIL_MESSAGES_FETCHING='SET_FAIL_MESSAGES_FETCHING';

export const MessageActionType={UPDATE_MESSAGES,ADD_MESSAGE,SET_FAIL_MESSAGES_FETCHING};

function setFailMessagesFetching(failed){
    return {
        type:SET_FAIL_MESSAGES_FETCHING,
        failed
    };
}

function updateMessages(messages){
    return {
        type:UPDATE_MESSAGES,
        messages
    };
}

function addMessage(message){
    return {
        type:ADD_MESSAGE,
        message
    };
}

export const MessageActions={updateMessages,addMessage,setFailMessagesFetching};