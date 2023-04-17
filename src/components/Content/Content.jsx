import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import DayOff from "../DayOff/DayOff";
import InputForm from "../Form/InputForm";
import Groups from "../Groups/Groups";
import Members from "../Members/Members";
import Notifications from "../Notifications/Notifications";
import RequestDetail from "../RequestDetail/RequestDetail";
import Requests from "../Requests/Requests";
import Sync from "../Sync/Sync";
import Workspaces from "../Workspaces/Workspaces";

import "./Content.scss";

const { Content } = Layout;

const ContentConfig = () => {
  return (
    <Content className="site-layout-background">
      <Routes>
        <Route exact path="/form" element={<InputForm />} />

        <Route exact path="/account/dashboard" element={<Dashboard />} />
        <Route exact path="/account/requests" element={<Requests />} />
        <Route
          exact
          path="/account/requests/request-detail"
          element={<RequestDetail />}
        />
        <Route exact path="/account/day-offs" element={<DayOff />} />

        <Route exact path="/manager/members" element={<Members />} />
        <Route exact path="/manager/groups" element={<Groups />} />
        <Route
          exact
          path="/manager/notifications"
          element={<Notifications />}
        />
        <Route exact path="/manager/sync" element={<Sync />} />

        <Route
          exact
          path="/administrator/workspaces"
          element={<Workspaces />}
        />
      </Routes>
    </Content>
  );
};

export default ContentConfig;
