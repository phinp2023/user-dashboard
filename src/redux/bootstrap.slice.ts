import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MockupApi } from 'api/mockup.api';
import { BootstrapState, RootEpic, SystemConfig } from "common/type-state";
import { ajax } from "rxjs/ajax";
import { filter, map, switchMap } from "rxjs/operators";


const PATH_SYSTEM_CONFIG = `${process.env.PUBLIC_URL}/assets/system-config.json`;
const USE_DEFAULT_CONFIG = process.env.REACT_APP_USE_DEFAULT_CONFIG || false;
const DEFAULT_CONFIG: SystemConfig = {
    protocol: process.env.REACT_APP_HOST_PROTOCOL as 'http' | 'https' || 'http',
    hostMockup: process.env.REACT_APP_HOST_MOCKUP || '/',
    baseName: process.env.REACT_APP_BASENAME || '/',
};
const initialStateBootstrap: BootstrapState = {
    systemConfig: DEFAULT_CONFIG,
    isSuccess: false,
};

const updateHostService = (config: SystemConfig) => {
    MockupApi.setConfig(config);
};


const bootstrapSlice = createSlice({
    name: 'bootstrap',
    initialState: initialStateBootstrap,
    reducers: {
        setSystemConfig: (state, action: PayloadAction<SystemConfig>) => {
            updateHostService(action.payload);
            state.systemConfig = action.payload;
            state.isSuccess = true;
        },
        fetchConfig: (state) => {
            state.isSuccess = false;
        }
    }
})

const bootstrap$: RootEpic = (action$) => action$.pipe(
    filter(fetchConfig.match),
    switchMap(() => {
        return ajax.getJSON(PATH_SYSTEM_CONFIG, {
            "Content-Type": "application/json",
            Accept: "application/json",
        }).pipe(map(res => {
            const config = USE_DEFAULT_CONFIG ? DEFAULT_CONFIG : res as SystemConfig;
            return bootstrapSlice.actions.setSystemConfig(config)
        }))
    })
);


export const BootstrapEpics = [
    bootstrap$
];

export const { fetchConfig } = bootstrapSlice.actions;
export default bootstrapSlice.reducer;
