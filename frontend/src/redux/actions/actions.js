import axios from "axios"
import { DELETEBOARDFAIL, DELETEBOARDREQ, DELETEBOARDSUCCESS, DELETETASKFAIL, DELETETASKREQ, DELETETASKSUCCESS, GETBOARDFAIL, GETBOARDREQ, GETBOARDSUCCESS, GETTASKFAIL, GETTASKREQ, GETTASKSUCCESS, POSTBOARDFAIL, POSTBOARDREQ, POSTBOARDSUCCESS, POSTTASKFAIL, POSTTASKSUCCESS, SETBOARDID, UPDATETASKFAIL, UPDATETASKREQ, UPDATETASKSUCCESS } from "../constants/counter"

const uri = "https://kanban-backend-t0ed.onrender.com/api"
export const get_boards = () => {
    return async (dispatch) => {
        try {
            const action = { type: "", payload: "" }
            action.type = GETBOARDREQ
            dispatch(action)
            const { data } = await axios.get(`${uri}/boards`)
            action.type = GETBOARDSUCCESS
            action.payload = data
            dispatch(action)
        } catch (error) {
            const action = { type: "", payload: "" }
            action.type = GETBOARDFAIL
            action.payload = error
            dispatch(action)
        }
    }
}
export const post_board = (title) => {
    return async (dispatch) => {
        try {
            const action = { type: "", payload: "" }
            action.type = POSTBOARDREQ
            dispatch(action)
            const { data } = await axios.post(`${uri}/newboard`, { boardTitle: title }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            action.type = POSTBOARDSUCCESS
            action.payload = data
            dispatch(action)
            dispatch(get_boards())
        } catch (error) {
            const action = { type: "", payload: "" }
            action.type = POSTBOARDFAIL
            action.payload = error
            dispatch(action)
        }
    }
}
export const delete_board = (id) => {
    return async (dispatch, getState) => {
        try {
            const action = { type: "", payload: "" }
            action.type = DELETEBOARDREQ
            dispatch(action)
            const { data } = await axios.delete(`${uri}/deleteboard/${id}`)
            action.type = DELETEBOARDSUCCESS
            action.payload = data
            dispatch(action)
            dispatch(get_boards())
            dispatch(set_board(""))
        } catch (error) {
            const action = { type: "", payload: "" }
            action.type = DELETEBOARDFAIL
            action.payload = error
            dispatch(action)
        }
    }
}

export const get_task = (id) => {
    if (id === "") {
        return { type: "" }
    }
    return async (dispatch) => {
        try {
            const action = { type: "", payload: "" }
            action.type = GETTASKREQ
            dispatch(action)
            const { data } = await axios.get(`${uri}/alltasks/${id}`)
            action.type = GETTASKSUCCESS
            action.payload = data
            dispatch(action)
        } catch (error) {
            const action = { type: "", payload: "" }
            action.type = GETTASKFAIL
            action.payload = error
            dispatch(action)
        }
    }
}

export const post_task = (title, description, status, boardid = '') => {
    if (boardid === '') {
        return { type: "" }
    }
    return async (dispatch, getState) => {
        try {
            const action = { type: "", payload: "" }
            action.type = POSTBOARDREQ
            dispatch(action)
            const { data } = await axios.post(`${uri}/addtask`, { taskTitle: title, taskDesc: description, taskStatus: status, boardId: boardid }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            action.type = POSTTASKSUCCESS
            action.payload = data
            dispatch(action)
            dispatch(get_task(getState().cur_board))
        } catch (error) {
            const action = { type: "", payload: "" }
            action.type = POSTTASKFAIL
            action.payload = error
            dispatch(action)
        }
    }
}

export const delete_task = (id) => {
    return async (dispatch, getState) => {
        try {
            const action = { type: "", payload: "" }
            action.type = DELETETASKREQ
            dispatch(action)
            const { data } = await axios.delete(`${uri}/deletetask/${id}`)
            action.type = DELETETASKSUCCESS
            action.payload = data
            dispatch(action)
            dispatch(get_task(getState().cur_board))
        } catch (error) {
            const action = { type: "", payload: "" }
            action.type = DELETETASKFAIL
            action.payload = error
            dispatch(action)
        }
    }
}

export const update_task = (id, title, description, status) => {
    return async (dispatch, getState) => {
        try {
            const action = { type: "", payload: "" }
            action.type = UPDATETASKREQ
            dispatch(action)
            const { data } = await axios.patch(`${uri}/updatetask/${id}`, { taskTitle: title, taskDesc: description, taskStatus: status })
            action.type = UPDATETASKSUCCESS
            action.payload = data
            dispatch(action)
            dispatch(get_task(getState().cur_board))
        } catch (error) {
            const action = { type: "", payload: "" }
            action.type = UPDATETASKFAIL
            action.payload = error
            dispatch(action)
        }
    }
}

export const set_board = (boardId) => {
    return async (dispatch) => {
        const action = { type: "", payload: "" }
        action.type = SETBOARDID
        action.payload = boardId
        dispatch(action)
    }
}