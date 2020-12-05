
const UPDATE_USER="UPDATE_USER";
const SET_USER_FETCHING="IS_FETCHING_USER";
const SET_FAILED_USER_FETCHING="SET_FAILED_USER_FETCHING";

function updateUser(user){
    return {
        type:UPDATE_USER,
        user
    };
}

function setUserFetching(isFetching){
    return {
        type:SET_USER_FETCHING,
        isFetching
    };
}

function setFailedUserFetching(isFailed){
    return {
        type:SET_FAILED_USER_FETCHING,
        isFailed
    }
}

export const UserActionTypes={UPDATE_USER,SET_USER_FETCHING,SET_FAILED_USER_FETCHING};
export const UserActions={updateUser,setUserFetching,setFailedUserFetching};