import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MockupApi } from 'api/mockup.api';
import { RootEpic, StateUser, User } from 'common/type-state';
import { merge } from 'rxjs';
import { catchError, filter, switchMap, withLatestFrom } from 'rxjs/operators';

const initLoginState: StateUser = {
    loading: false,
    errorMsg: '',
    success: false,
    users: null,
    currentAction: '',
};

const user = createSlice({
    name: 'user',
    initialState: initLoginState,
    reducers: {
        setUserFetching(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setUserAction(state, action: PayloadAction<string>) {
            state.currentAction = action.payload;
        },
        setAllUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        getAllUsers(state, action: PayloadAction<undefined>) {
            return;
        },
        getUser(state, action: PayloadAction<string>) {
            return;
        },
        createUser(state, action: PayloadAction<User>) {
            return;
        },
        editUser(state, action: PayloadAction<User>) {
            return;
        },
        deleteUser(state, action: PayloadAction<string>) {
            return;
        },
    },
});

export const getAllUsers$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(getAllUsers.match),
        withLatestFrom(state$),
        switchMap(([action, state]) => {
            return merge(
                [setUserFetching(true)],
                MockupApi.getAllUsers().pipe(
                    switchMap((res: any) => {
                        return [setAllUsers(res), setUserFetching(false)];
                    }),
                    catchError((err) => {
                        return [setUserFetching(false)];
                    })
                )
            );
        })
    );

export const createUser$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(createUser.match),
        withLatestFrom(state$),
        switchMap(([action, state]) => {
            return merge(
                [setUserFetching(true)],
                MockupApi.createUser(action.payload).pipe(
                    switchMap((res: any) => {
                        return [setUserFetching(false), setUserAction(`Create ${res.id}`)];
                    }),
                    catchError((err) => {
                        return [setUserFetching(false)];
                    })
                )
            );
        })
    );

export const editUser$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(editUser.match),
        withLatestFrom(state$),
        switchMap(([action, state]) => {
            return merge(
                [setUserFetching(true)],
                MockupApi.editUser(action.payload).pipe(
                    switchMap((res: any) => {
                        return [setUserFetching(false), setUserAction(`Update ${res.id}`)];
                    }),
                    catchError((err) => {
                        return [setUserFetching(false)];
                    })
                )
            );
        })
    );

export const deleteUser$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(deleteUser.match),
        withLatestFrom(state$),
        switchMap(([action, state]) => {
            return merge(
                [setUserFetching(true)],
                MockupApi.deleteUser(action.payload).pipe(
                    switchMap((res: any) => {
                        return [setUserFetching(false), setUserAction(`Delelte ${res.id}`)];
                    }),
                    catchError((err) => {
                        return [setUserFetching(false)];
                    })
                )
            );
        })
    );

export const UserActionEpics = [
    getAllUsers$,
    createUser$,
    editUser$,
    deleteUser$,
];

export const {
    setUserFetching,
    setUserAction,
    setAllUsers,
    getAllUsers,
    getUser,
    createUser,
    editUser,
    deleteUser,
} = user.actions;

export default user.reducer;
