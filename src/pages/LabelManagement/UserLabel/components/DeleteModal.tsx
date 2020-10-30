import React from 'react';
import { Modal } from 'antd';

interface CompProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const Comp: React.FC<CompProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title="确认删除标签"
      visible={modalVisible}
      onOk={() => onCancel()}
      onCancel={() => onCancel()}
      okText="确定"
      cancelText="取消"
    >
      {props.children}
    </Modal>
  );
};

export default Comp;
