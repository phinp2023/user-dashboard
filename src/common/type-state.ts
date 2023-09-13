import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { RootState } from 'redux/rootReducers';

export type RootEpic = Epic<AnyAction, AnyAction, RootState>;

export interface SystemConfig {
    protocol: 'http' | 'https';
    hostMockup: string;
    baseName: string;
}

export interface BootstrapState {
    systemConfig: SystemConfig;
    isSuccess: boolean;
}

export interface User {
    id: string;
    username: string;
    password: string;
    role: string;
}

export interface StateUser {
    loading: boolean;
    errorMsg: string;
    success: boolean;
    users: User[] | null;
    currentAction: string;
}


export interface FilterUser {
    id: string;
    username: string;
    role: string;
}

export interface StateModal {
    currentItem: object,
    modalVisible: boolean,
    modalType: 'create' | 'update',
}