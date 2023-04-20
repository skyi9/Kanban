import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { boardReducer, boardReducerDelete, boardReducerPost, currentBoard, taskDelete, taskGet, taskPost, taskUpdate } from './reducers/reducers';

const middleware = thunk
const reducer = combineReducers({
    get_boards: boardReducer,
    post_board: boardReducerPost,
    delete_board: boardReducerDelete,
    get_tasks: taskGet,
    post_task: taskPost,
    delete_task: taskDelete,
    update_task: taskUpdate,
    cur_board: currentBoard
})

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(middleware)))

export default store