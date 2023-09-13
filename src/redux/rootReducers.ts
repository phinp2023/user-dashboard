import { combineReducers } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import BootstrapReducer, { BootstrapEpics } from "./bootstrap.slice";
import UserReducer, { UserActionEpics } from "./user.slice";

const rootReducer = combineReducers({
    bootstrap: BootstrapReducer,
    user: UserReducer
});

export const rootEpic = combineEpics(
    ...BootstrapEpics,
    ...UserActionEpics
);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
