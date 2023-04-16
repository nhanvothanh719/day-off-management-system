import { Layout } from 'antd';
import React, { Fragment, useState } from 'react';
import BreadcrumbComponent from '../components/Breadcrumb/Breadcrumb';
import HeaderComponent from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
import ContentConfig from '../components/Content/Content';


const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Fragment>
      <Layout>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className="site-layout">
          <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
          <BreadcrumbComponent />
          <ContentConfig />
        </Layout>
      </Layout>
    </Fragment>
  );
};
export default Dashboard;
