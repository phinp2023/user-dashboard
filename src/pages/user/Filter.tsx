import React from 'react';
import { Button, Row, Col, Form, Input, Select } from 'antd';
import { FilterUser } from 'common/type-state';

interface PropsFilter {
    onFilterChange: (value: FilterUser) => void;
}

const Filter: React.FunctionComponent<PropsFilter> = ({ onFilterChange }) => {
    const [form] = Form.useForm();

    const onFinish = (values: FilterUser) => {
        onFilterChange(values);
    };

    return (
        <Form form={form} name='control-filter' onFinish={onFinish}>
            <Row gutter={[24, 24]} justify='space-between'>
                <Col lg={{ span: 24 }} xl={{ span: 18 }}>
                    <Row gutter={100} justify='space-between'>
                        <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item name='id' label='ID'>
                                <Input placeholder='Search id' />
                            </Form.Item>
                        </Col>
                        <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item name='role' label='Role'>
                                <Select
                                    placeholder='Select user role'
                                    allowClear
                                >
                                    <Select.Option value='Manager'>
                                        Manager
                                    </Select.Option>
                                    <Select.Option value='Admin'>
                                        Admin
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={100} justify='space-between'>
                        <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name='username'
                                label='Username'
                                style={{ marginBottom: 0 }}
                            >
                                <Input placeholder='Search username' />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col
                    sm={{ span: 24 }}
                    xl={{ span: 6 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}
                >
                    <Button
                        type='primary'
                        className='btn-action'
                        htmlType='submit'
                    >
                        Search
                    </Button>
                    <Button
                        className='btn-action'
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Filter;
