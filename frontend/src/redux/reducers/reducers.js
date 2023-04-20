import { DELETEBOARDFAIL, DELETEBOARDREQ, DELETEBOARDSUCCESS, DELETETASKFAIL, DELETETASKREQ, DELETETASKSUCCESS, GETBOARDFAIL, GETBOARDREQ, GETBOARDSUCCESS, GETTASKFAIL, GETTASKREQ, GETTASKSUCCESS, POSTBOARDFAIL, POSTBOARDREQ, POSTBOARDSUCCESS, POSTTASKFAIL, POSTTASKREQ, POSTTASKSUCCESS, SETBOARDID, UPDATETASKFAIL, UPDATETASKREQ, UPDATETASKSUCCESS } from "../constants/counter";

export const boardReducer = (boardState = { loading: false, data: [], error: null }, action) => {
    switch (action.type) {
        case GETBOARDREQ:
            return { loading: true }
        case GETBOARDSUCCESS:
            return { loading: false, data: action.payload }
        case GETBOARDFAIL:
            return { loading: false, error: action.payload }
        default:
            return boardState
    }
}
export const boardReducerPost = (boardPostState = { loading: false, data: [], error: null }, action) => {
    switch (action.type) {
        case POSTBOARDREQ:
            return { loading: true }
        case POSTBOARDSUCCESS:
            return { loading: false, data: action.payload }
        case POSTBOARDFAIL:
            return { loading: false, error: action.payload }
        default:
            return boardPostState
    }
}
export const boardReducerDelete = (boardDeleteState = { loading: false, data: [], error: null }, action) => {
    switch (action.type) {
        case DELETEBOARDREQ:
            return { loading: true }
        case DELETEBOARDSUCCESS:
            return { loading: false, data: action.payload }
        case DELETEBOARDFAIL:
            return { loading: false, error: action.payload }
        default:
            return boardDeleteState
    }
}
export const taskGet = (taskGetState = { loading: false, data: [], error: null }, action) => {
    switch (action.type) {
        case GETTASKREQ:
            return { loading: true }
        case GETTASKSUCCESS:
            return { loading: false, data: action.payload }
        case GETTASKFAIL:
            return { loading: false, error: action.payload }
        default:
            return taskGetState
    }
}
export const taskPost = (taskPostState = { loading: false, data: [], error: null }, action) => {
    switch (action.type) {
        case POSTTASKREQ:
            return { loading: true }
        case POSTTASKSUCCESS:
            return { loading: false, data: action.payload }
        case POSTTASKFAIL:
            return { loading: false, error: action.payload }
        default:
            return taskPostState
    }
}
export const taskDelete = (taskDeleteState = { loading: false, data: [], error: null }, action) => {
    switch (action.type) {
        case DELETETASKREQ:
            return { loading: true }
        case DELETETASKSUCCESS:
            return { loading: false, data: action.payload }
        case DELETETASKFAIL:
            return { loading: false, error: action.payload }
        default:
            return taskDeleteState
    }
}
export const taskUpdate = (taskUpdateState = { loading: false, data: [], error: null }, action) => {
    switch (action.type) {
        case UPDATETASKREQ:
            return { loading: true }
        case UPDATETASKSUCCESS:
            return { loading: false, data: action.payload }
        case UPDATETASKFAIL:
            return { loading: false, error: action.payload }
        default:
            return taskUpdateState
    }
}

export const currentBoard = (boardId = "", action) => {
    switch (action.type) {
        case SETBOARDID:
            return action.payload
        default:
            return boardId
    }
}