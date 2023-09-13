/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer, { rootEpic, RootState } from './rootReducers';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware({
            thunk: false,
            immutableCheck: false,
            serializableCheck: false
        }),
        epicMiddleware
    ]
});

epicMiddleware.run(rootEpic);
type AppDispatch = typeof store.dispatch;
export const useDispatchRoot = () => {
    const dispatch = useDispatch<AppDispatch>();
    const funcMemo = useCallback((event: AnyAction) => {
        dispatch(event);
    }, [dispatch])
    return funcMemo;
}
export function useSelectorRoot<T>(fn: (store: RootState) => T): T {
    return useSelector(fn);
}
export function useSelectorMemo<T>(fn: (store: RootState) => T): T {
    const memoFunc = useMemo(() => fn, [fn]);
    return useSelector(memoFunc)
}
export default store;
