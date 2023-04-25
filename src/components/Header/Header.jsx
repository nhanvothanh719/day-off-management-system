import {
  AntDesignOutlined,
  PlusCircleOutlined,
  ExportOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
} from "antd";
import menu_close from "../../assets/images/menu_close.png";
import menu_open from "../../assets/images/menu_open.png";
import "./Header.scss";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../actions/auth";
import store from "../../store";
import { clearAccessToken } from "../../actions/accessToken";
import { clearRefreshToken } from "../../actions/refreshToken";
import { useSelector } from "react-redux";

const auth = getAuth();

function HeaderComponent(props) {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userRole);
  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    avatar: "",
  });

  useEffect(() => {
    if (app) {
      setCurrentUser({
        displayName: localStorage.getItem("user_name"),
        avatar: localStorage.getItem("user_avatar"),
      });
    }
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      store.dispatch(logoutSuccess());
      store.dispatch(clearAccessToken());
      store.dispatch(clearRefreshToken());
      localStorage.clear();
      navigate("/login");
    });
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined style={{ color: "#ea7a9a", fontSize: "16px" }} />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<ExportOutlined style={{ color: "#ea7a9a", fontSize: "16px" }} />}
        onClick={handleLogout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  const avatar_size = {
    xs: 35,
    sm: 45,
    md: 45,
    lg: 45,
    xl: 45,
    xxl: 45,
  };

  return (
    <Layout.Header className="header-container">
      <Row className="header-container">
        <Col
          xs={2}
          sm={2}
          md={2}
          lg={2}
          xl={2}
          onClick={() => props.setCollapsed(!props.collapsed)}
        >
          <img
            src={!props.collapsed ? menu_open : menu_close}
            alt="menu_icon"
          />
        </Col>
        <Col xs={17} sm={17} md={17} lg={17} xl={17} className="badge">
          <Badge
            style={{ backgroundColor: "#ea7a9a", fontWeight: "bold" }}
            onClick={() => navigate("/account/requests/new")}
          >
            <PlusCircleOutlined
              style={{
                fontSize: "30px",
                color: "rgb(76, 129, 71)",
                backgroundColor: "hsla(0,0%,98%,.8)",
                borderRadius: "50%",
                padding: "10px",
              }}
            />
          </Badge>
        </Col>
        <Col xs={5} sm={5} md={5} lg={5} xl={5} className="avatar-container">
          <Dropdown
            overlay={menu}
            placement="bottom"
            className="avatar-dropdown"
          >
            <div style={{ display: "flex" }}>
              {currentUser.avatar ? (
                <Avatar
                  size={{ xs: 35, sm: 45, md: 45, lg: 45, xl: 45, xxl: 45 }}
                  src={currentUser.avatar}
                />
              ) : (
                <Avatar
                  className="avatar"
                  size={{ ...avatar_size }}
                  icon={<AntDesignOutlined />}
                />
              )}
              <Space
                direction="vertical"
                size={[8, 0]}
                className="avatar-details"
              >
                {currentUser && (
                  <Typography.Text className="avatar-name">
                    {currentUser.displayName ? currentUser.displayName : "User"}
                  </Typography.Text>
                )}
                {userRole && (
                  <Typography.Text className="avatar-role">
                    {userRole ? userRole : "Staff"}
                  </Typography.Text>
                )}
              </Space>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default HeaderComponent;
