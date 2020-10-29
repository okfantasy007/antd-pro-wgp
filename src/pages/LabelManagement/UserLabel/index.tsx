import React from "react";
import { Card, Form, Input, Button, Select, Divider, Row, Col } from 'antd';
import SearchTree from './components/SearchTree';

const Comp: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
      <Card>
        {/*LabelManagement/UserLabel*/}
        <Form
          layout="inline"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item name="name" label="标签名称">
            <Input placeholder="根据标签名称搜索" />
          </Form.Item>
          <Form.Item name="type" label="标签类型">
            <Select
              placeholder="请选择"
              allowClear
              style={{width: 200}}
            >
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="update_type" label="更新方式">
            <Select
              placeholder="请选择"
              allowClear
              style={{width: 200}}
            >
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="define_type" label="标签定义方式">
            <Select
              placeholder="请选择"
              allowClear
              style={{width: 200}}
            >
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="release_status" label="发布状态">
            <Select
              placeholder="请选择"
              allowClear
              style={{width: 200}}
            >
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={onReset}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
        <Divider />
        <Row>
          <Col span={6}>
            <SearchTree/>
          </Col>
          <Col span={18}>

          </Col>
        </Row>
      </Card>
  );
};

export default Comp;
