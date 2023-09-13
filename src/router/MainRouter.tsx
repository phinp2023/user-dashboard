import { CLoading } from 'components';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouterArr from './router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import MainLayout from 'layouts/Main';

const MainRouter = (): JSX.Element => {
    const basename = useSelector<RootState, string>(
        (state) => state.bootstrap.systemConfig.baseName
    );
    return (
        <Router basename={basename}>
            <MainLayout>
                <Suspense
                    fallback={<CLoading spinning={true} fullScreen={true} />}
                >
                    <Routes>
                        {RouterArr.map(
                            ({ path, component, isNotPrivate, ...rest }) => (
                                <Route
                                    path={path}
                                    Component={component}
                                    key={path}
                                    {...rest}
                                />
                            )
                        )}
                    </Routes>
                </Suspense>
            </MainLayout>
        </Router>
    );
};

export default MainRouter;
