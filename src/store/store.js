import {createStore,applyMiddleware,combineReducers} from 'redux'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'
import headerisShow from './reducers/headerisShow'
import headerTitle from './reducers/headerTitle'
import userinfo from './reducers/userinfo'
import footerisshow from './reducers/footerisshow'
import chatinfo from './reducers/chatinfo'
import messageList from './reducers/messageList'
import emjlist from './reducers/emjlist'
import addressdata from './reducers/addressdata'
import validation from './reducers/validation'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
    headerisShow,
    headerTitle,
    userinfo,
    footerisshow,
    chatinfo,
    messageList,
    emjlist,
    addressdata,
    validation
})


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer,applyMiddleware(reduxPromise,reduxThunk))

let persistor = persistStore(store)

export   {
    store,
    persistor
}