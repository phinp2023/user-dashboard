import { BoostrapContext, useReducerBoostrap } from 'context/boostrap.context';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchConfig } from 'redux/bootstrap.slice';
import { getBootstrapState } from 'redux/selectors';
import { useSelectorRoot } from 'redux/store';

const BootstrapSystem = ({ children }: Props): JSX.Element | null => {
    const value = useReducerBoostrap();
    const { isSuccess } = useSelectorRoot(getBootstrapState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchConfig());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isSuccess) {
        return null;
    }
    return (
        <BoostrapContext.Provider value={value}>
            {children}
        </BoostrapContext.Provider>
    );
};

export default BootstrapSystem;
