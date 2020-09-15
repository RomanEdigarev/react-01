function createStore(reducer, initialState) {
    let state = initialState;

    return {
        dispatch: (action) => {
            state = reducer(state, action)
        },
        getState: () => state,
    }

}

const toDoReducer = (state, action) => {
    switch (action.type) {
        case 'LOG': {
            console.log('Logging')
            return {...state, logging: 'logging'};
        }
        default:
            return state;
    }
}

const logReducer = (state, action) => {
    switch (action.type) {
        case 'LOG2': {
            console.log('LOG2');
            return {...state, logging2: 'LOG2'}
        }
        default: return state;

    }
}

const initialState = {mainState: 'MainState'};



const combineReducer = (reducersMap) => {
    return (
        (state, action) => {
            const nextState = {};
            Object.entries(reducersMap).forEach(([key, reducer]) => {
                nextState[key] = reducer(state[key], action)
            })
            return nextState;
        }
    )
}

const reducer = combineReducer({toDoReducer, logReducer})


const store = createStore(reducer, initialState);

store.dispatch({type: 'LOG2'});

console.log(store);
console.log(store.getState());

/********************************************************* */

const thunk = store => dispatch => action => {
    if(typeof action === 'function') {
        return action(store.dispatch, store.getState)
    }
    return dispatch(action);
}

function applyMiddleware(middleware) {
    return function createStoreWithMiddleware(createStore) {
        return (reducer, state) => {
            const store = createStore(reducer, state)

            return {
                dispatch: action => middleware(store)(store.dispatch)(action),
                getState: store.getState,
            }
        }
    }
}
