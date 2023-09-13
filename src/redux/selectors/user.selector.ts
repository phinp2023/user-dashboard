import { createSelector } from '@reduxjs/toolkit';
import { selectSelfUser } from './self.selector';

export const getLoadingUser = createSelector(
    selectSelfUser,
    (state) => state.loading
);

export const getUsers = createSelector(selectSelfUser, (state) => state.users);

export const getCurrentAction = createSelector(
    selectSelfUser,
    (state) => state.currentAction
);
