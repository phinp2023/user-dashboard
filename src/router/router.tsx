import React, { ComponentClass, FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';

export interface RouterItem {
    path: string;
    component: ComponentClass | FunctionComponent;
    exact?: boolean;
    isNotPrivate?: boolean;
    icon: string;
    name: string;
}

const UserModule = React.lazy(() => import('../pages/user'));

const RouterArr: RouterItem[] = [
    {
        path: '/',
        component: () => <Navigate to="/manage/user"/>,
        exact: true,
        isNotPrivate: true,
        icon: 'user',
        name: 'User Dashboard',
    },
    {
        path: '/manage/user',
        component: UserModule,
        exact: true,
        isNotPrivate: true,
        icon: 'user',
        name: 'User Dashboard',
    },
];

export default RouterArr;
