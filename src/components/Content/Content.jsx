import { Layout } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InputForm from '../Form/Form';
import Requests from '../Requests/Requests';

const {  Content } = Layout;

function ContentConfig() {
  return (
    <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            backgroundColor: "#fff"
          }}
        >
          <Routes>

            <Route exact path="/account/dashboard" element={<InputForm />} />
            <Route exact path="/account/requests" element={<Requests />} />
            <Route exact path="/account/day-offs" element={<InputForm />} />

            <Route exact path="/manager/members" element={<InputForm />} />
            <Route exact path="/manager/groups" element={<InputForm />} />
            <Route exact path="/manager/notifications" element={<InputForm />} />
            <Route exact path="/manager/sync" element={<InputForm />} />

            <Route exact path="/administrator/workspaces" element={<InputForm />} />
          </Routes>
        </Content>
  )
}

export default ContentConfig