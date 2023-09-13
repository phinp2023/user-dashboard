import {
    ContextMenuState as BoostrapState,
} from 'common/define';
import React, {
    useContext, useReducer,
} from 'react';

type ActionReducer =
    | { type: ''; payload: null }

export interface BoostrapContextType {
    state: BoostrapState;
    dispatch: React.Dispatch<ActionReducer>;
}

/** define, functions */
export const BoostrapContext = React.createContext<BoostrapContextType | null>(
    null,
);
export function useContextBoostrap(): BoostrapContextType {
    return useContext(BoostrapContext) as BoostrapContextType;
}

const initState: BoostrapState = {

};

const reducer = (state: BoostrapState, action: ActionReducer) => {
    switch (action.type) {

        default:
            return state;
    }
};

export function useReducerBoostrap(): BoostrapContextType {
    const [state, dispatch] = useReducer(reducer, initState);

    return {
        state,
        dispatch,
    };
}
