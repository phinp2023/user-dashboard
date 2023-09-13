import { RootState } from 'redux/rootReducers';

export const selectSelfBootstrap = (state: RootState) => state.bootstrap;
export const selectSelfUser = (state: RootState) => state.user;
