import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {mainReduser} from "../Redusers/mainReduser";
import {tagsReduser} from "../Redusers/tagsReduser";

const rootReducer = combineReducers({
    main: mainReduser,
    tag: tagsReduser
})
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
