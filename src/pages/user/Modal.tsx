import React from 'react';
import { Form, Input, Modal, Button, Select } from 'antd';
import _ from 'lodash';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

interface ModalProps {
    item: any;
    loading: boolean;
    onOk: (data: any) => void;
    onCancel: () => void;
}

const UserModal: React.FunctionComponent<ModalProps> = React.memo((props) => {
    const formRef = React.useRef<any>();

    const handleOk = () => {
        const { item = {}, onOk } = props;
        formRef.current
            .validateFields()
            .then((values: any) => {
                onOk({ item, values });
            })
            .catch((errorInfo: any) => {
                // console.log(errorInfo);
            });
    };
    const { item = {}, onOk, ...modalProps } = props;

    return (
        <Modal
            {...modalProps}
            footer={[
                <Button key='cancel' onClick={props.onCancel}>
                    Cancel
                </Button>,
                <Button
                    key='Ok'
                    type='primary'
                    loading={props.loading}
                    onClick={handleOk}
                >
                    Ok
                </Button>,
            ]}
        >
            <Form
                ref={formRef}
                name='control-modal'
                initialValues={{ ...item }}
                layout='horizontal'
            >
                {!_.isEmpty(props.item) && (
                    <FormItem
                        label='ID'
                        name='id'
                        hasFeedback
                        {...formItemLayout}
                    >
                        <Input disabled />
                    </FormItem>
                )}
                <FormItem
                    label='Username'
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your username!',
                        },
                    ]}
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input placeholder='Enter username' />
                </FormItem>
                <FormItem
                    label='Password'
                    name='newPassword'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password!',
                        },
                    ]}
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input.Password placeholder='Enter password' />
                </FormItem>
                <FormItem
                    label='Confirm'
                    name='confirmPassword'
                    dependencies={['newPassword']}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your confirm password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('newPassword') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The new password that you entered do not match!'
                                    )
                                );
                            },
                        }),
                    ]}
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input.Password placeholder='Enter confirm password' />
                </FormItem>
                <Form.Item
                    label='Role'
                    name='role'
                    rules={[
                        { required: true, message: 'Please select user role!' },
                    ]}
                    hasFeedback
                    {...formItemLayout}
                >
                    <Select placeholder='Select user role' allowClear>
                        <Select.Option value='Manager'>Manager</Select.Option>
                        <Select.Option value='Admin'>Admin</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default UserModal;
