import React, { useRef, useState, useEffect } from 'react';
import {Form, Input, Button, Select, Divider, Row, Col, Card} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchTree from './components/SearchTree';
import LabelUpdateList from './components/LabelUpdateList';
import DeleteModal from './components/DeleteModal';
import StatusCircle from './components/StatusCircle';
import styles from './index.less';

const Comp: React.FC<{}> = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [queryParams, setQueryParams] = useState(null);

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('values', values);
    setQueryParams(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const toggleModalVisible = () => {
    setDeleteModalVisible(!deleteModalVisible);
  };

  return (
    <PageHeaderWrapper>
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
            <Button type="default" onClick={() => {onReset(1)}}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
        <Divider />
        <Row>
          <Col span={3}>
            <SearchTree/>
          </Col>
          <Col span={20} offset={1}>
            <div className={styles.mb10}>
              <span style={{marginRight: 40}}>当前标签（总人数100人）</span>
              <span style={{marginRight: 40}}>更新时间：2020-09-09 06:00:00</span>
              <Button type="primary" onClick={toggleModalVisible}>删除</Button>
              <StatusCircle text="待发布"/>
            </div>
            <div className={styles.mb10}>
              <span>标签分类：基础标签</span>
            </div>
            <div className={styles.mb10}>
              <span>标签类型：离线标签（例行更新）</span>
            </div>
            <div className={styles.mb10}>
              <span>标签定义方式：自定义标签</span>
            </div>
            <div className={`${styles.bold} ${styles.mb10}`}>
              标签分布情况
            </div>
            <div className={`${styles.bold} ${styles.mb10}`}>
              标签更新情况
            </div>
            <div className={styles.mb10}>
              <LabelUpdateList queryParams={queryParams}/>
            </div>
            <Row justify='end'>
              <Col>创建人：刘元兵，创建时间：2020-09-08 17:00:00</Col>
            </Row>
          </Col>
        </Row>
        <DeleteModal modalVisible={deleteModalVisible} onCancel={toggleModalVisible}>
          <span>标签删除后不可恢复，你确定要删除吗？</span>
        </DeleteModal>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Comp;
