import { Layout } from 'antd';
import React, { Fragment, useState } from 'react';
import BreadcrumbComponent from '../components/Breadcrumb/Breadcrumb';
import HeaderComponent from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
const {  Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Fragment>
    <Layout>
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="site-layout">
        <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
        <BreadcrumbComponent />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
</Fragment>
  );
};
export default Dashboard;
