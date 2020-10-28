import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import homePic from '@/assets/images/home-bg.jpg';
import { Typography } from 'antd';

export default (): React.ReactNode => (
  <PageContainer>
    <div style={{
      marginBottom: 20,
    }}>
      <Typography.Text strong style={{fontSize: 20}}>
        欢迎登陆WGP万兴用户增长平台
      </Typography.Text>
    </div>
    <img src={homePic} width='100%' height='100%'/>
  </PageContainer>
);
