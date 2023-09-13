import React, { useEffect, useState } from 'react';
import { Breadcrumb, Spin } from 'antd';
import _ from 'lodash';
import Filter from './Filter';
import List from './List';
import Modal from './Modal';
import Page from 'components/CPage';
import { useDispatchRoot } from 'redux/store';
import {
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
} from 'redux/user.slice';
import { useSelector } from 'react-redux';
import { getCurrentAction, getLoadingUser, getUsers } from 'redux/selectors';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { FilterUser, StateModal } from 'common/type-state';

interface UserProps extends Props {}

const initStateModel: StateModal = {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
};

const initStateFilter: FilterUser = {
    id: '',
    username: '',
    role: '',
};

const User: React.FunctionComponent<UserProps> = (props) => {
    const dispatch = useDispatchRoot();
    const loading = useSelector(getLoadingUser);
    const currentAction = useSelector(getCurrentAction);
    const users = useSelector(getUsers);
    const [userData, setUserData] = useState(users);
    const [modal, setModal] = useState(initStateModel);
    const [filter, setFilter] = useState(initStateFilter);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [currentAction, dispatch]);

    useEffect(() => {
        setUserData(users);
    }, [users])

    useEffect(() => {
        setUserData(onSearch(filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const onSearch = (filter: FilterUser) => {
        if (!users) return [];
        const { id, username, role } = filter;
        return users.filter((item: any) => {
            let status = true;
            if (id) {
                status &&= item.id.toLowerCase().indexOf(id.toLowerCase()) > -1;
            }

            if (username) {
                status &&=
                    item.username
                        .toLowerCase()
                        .indexOf(username.toLowerCase()) > -1;
            }

            if (role)
                status &&=
                    item.role.toLowerCase().indexOf(role.toLowerCase()) > -1;

            return status;
        });
    };

    const modalProps = {
        item: modal.modalType === 'create' ? {} : modal.currentItem,
        open: modal.modalVisible,
        destroyOnClose: true,
        title: `${
            modal.modalType === 'create' ? `Create user` : `Update user`
        }`,
        centered: true,
        loading: loading,
        onOk: (data: any) => {
            const { item, values } = data;
            const { username, newPassword: password, role } = values;
            const newUser = { id: item?.id, username, password, role };
            if (_.isEmpty(item)) {
                dispatch(createUser(newUser));
            } else {
                dispatch(editUser(newUser));
            }
        },
        onCancel: () => {
            setModal(initStateModel);
        },
    };

    const filterProps = {
        onFilterChange: (value: FilterUser) => {
            setFilter(value);
        },
    };

    const listProps = {
        loading: loading,
        dataSource: userData,
        pagination: {
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30'],
        },
        showCreateModal: () => {
            setModal({ ...initStateModel, modalVisible: true });
        },
        showEditModal: (item: any) => {
            setModal({
                currentItem: item,
                modalType: 'update',
                modalVisible: true,
            });
        },
        onDeleteItem: (id: string) => {
            dispatch(deleteUser(id));
        },
    };

    const itemsBreadcumb = [
        {
            href: '/',
            title: <HomeOutlined />,
        },
        {
            title: (
                <>
                    <UserOutlined />
                    <span>User Dashboard</span>
                </>
            ),
        },
    ];

    return (
        <>
            <Spin
                spinning={false}
                size='large'
                wrapperClassName='bg-page-loading'
            >
                <div style={{ opacity: false ? 0 : 1 }}>
                    <div className='header-content'>
                        <Breadcrumb items={itemsBreadcumb} />

                        <h2 style={{ marginTop: '13px' }}>Page User</h2>
                    </div>
                    <div style={{ margin: '10px 20px' }}>
                        <Page inner>
                            <Filter {...filterProps} />
                            <List {...listProps} />
                            <Modal {...modalProps} />
                        </Page>
                    </div>
                </div>
            </Spin>
        </>
    );
};

export default User;
