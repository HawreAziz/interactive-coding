import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { ActionTypes } from './action-types'


const store = createStore(reducers, {}, applyMiddleware(thunk));


store.dispatch({
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
});

store.dispatch({
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
});


store.dispatch({
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
});

export { store };