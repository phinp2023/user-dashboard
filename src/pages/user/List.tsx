import React, { useState } from 'react';
import { Table, Form, Modal, Button } from 'antd';
import { CButtonOption } from 'components';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
interface ListProps {
    loading: boolean;
    pagination: any;
    onDeleteItem: (id: string) => void;
    showCreateModal: () => void;
    showEditModal: (item: any) => void;
}

const List: React.FC<ListProps> = (props) => {
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: props.pagination.defaultPageSize ?? 10,
    });

    const [form] = Form.useForm();

    const handleMenuClick = (record: any, e: any) => {
        const { onDeleteItem, showEditModal } = props;

        if (e.key === '1') {
            showEditModal(record);
        } else if (e.key === '2') {
            confirm({
                title: 'Do you want to delete these items?',
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    onDeleteItem(record.id);
                },
                onCancel() {},
                okButtonProps: {
                    loading: props.loading,
                },
            });
        }
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: '5%',
            align: 'center' as 'center',
            render: (text: string, record: any, index: number) =>
                (pagination.page - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '15%',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            width: '20%',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: '15%',
            align: 'center' as 'center',
        },
        {
            title: 'Action',
            key: 'operation',
            align: 'center' as 'center',
            width: '15%',
            render: (text: any, record: any) => {
                return (
                    <CButtonOption
                        onMenuClick={(e) => handleMenuClick(record, e)}
                        buttonOptions={[
                            { key: '1', name: 'Update', danger: false },
                            { key: '2', name: 'Delete', danger: true },
                        ]}
                    />
                );
            },
        },
    ];

    return (
        <Form form={form} component={false}>
            <div
                style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#f0f0f0',
                    marginTop: 30,
                    marginBottom: 20,
                }}
            ></div>
            <Button
                style={{ marginBottom: 20 }}
                type='primary'
                onClick={props.showCreateModal}
            >
                Add new
            </Button>
            <Table
                {...props}
                bordered
                columns={columns}
                pagination={{
                    ...props.pagination,
                    showTotal: (total) => `Total ${total} Items`,
                    onChange(page, pageSize) {
                        setPagination({ page, pageSize });
                    },
                }}
                scroll={{ x: 500 }}
                rowKey={(record) => record.id}
            />
        </Form>
    );
};

export default List;
