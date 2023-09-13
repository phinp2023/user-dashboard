import React from 'react';
import { NavLink } from 'react-router-dom';
import RouterArr, { RouterItem } from 'router/router';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

const { Sider } = Layout;

interface SidebarProps extends Props {
    collapsed: boolean;
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({
    collapsed,
    ...rest
}) => {
    const generateMenus = (): MenuItemType[] => {
        return RouterArr.filter((item: RouterItem) => item.path !== '/').map(
            (item: RouterItem, index: number) => ({
                key: index,
                icon: <UserOutlined />,
                label: (
                    <NavLink to={item.path || '#'}>
                        <span>{item.name}</span>
                    </NavLink>
                ),
            })
        );
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className='demo-logo-vertical' />
            <Menu
                theme='dark'
                mode='inline'
                // defaultSelectedKeys={['0']}
                selectedKeys={['0']}
                items={generateMenus()}
            />
        </Sider>
    );
};

export default Sidebar;
