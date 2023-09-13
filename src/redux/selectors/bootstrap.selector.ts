import { createSelector } from '@reduxjs/toolkit';
import { selectSelfBootstrap } from './self.selector';

export const getBootstrapState = createSelector(
    selectSelfBootstrap,
    (state) => state,
);
