import { createStore ,combineReducers, applyMiddleware} from "redux"
import ReduxThunk from 'redux-thunk'

const initialState = {
    count:0
}
const userInitialState = {
    count:0
}
const ADD = 'ADD'
function conutReducer(state=initialState,action){
    console.log(state,action);
    switch (action.type){
        case ADD:return {count :state.count+(action.num||1)}
        default:return state
    }
}
const UPDATE_USERNAME='UPDATE_USERNAME'
function userReducer(state=userInitialState,action){
    switch (action.type){
        case UPDATE_USERNAME:return {...state,username:action.name}
        default:return state
    }
}
// const store =createStore(reducer,initialState)
const allReducers =combineReducers({
    count:conutReducer,
    user:userReducer
})
const store =createStore(allReducers,{
    count:initialState,
    user:userInitialState
},applyMiddleware(ReduxThunk))
function add(num){
    return {
        type:ADD,
        num,
    }
}
function addAsync(num){
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(add(num))
        },1000)
    }
}
// console.log(store.getState());
store.dispatch(add(3))
// console.log(store);
store.subscribe(()=>{
    console.log('changed',store.getState());
})
store.dispatch(addAsync(5))
store.dispatch({type:UPDATE_USERNAME,name:'造文'})
export default store