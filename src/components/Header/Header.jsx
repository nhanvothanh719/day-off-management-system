import {
  AntDesignOutlined,
  BellOutlined,
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

const HeaderComponent = (props) => {
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined style={{ color: "#ea7a9a", fontSize: "16px" }} />}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<ExportOutlined style={{ color: "#ea7a9a", fontSize: "16px" }} />}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className="header-container">
      <Row className="header-container">
        <Col
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          onClick={() => props.setCollapsed(!props.collapsed)}
        >
          <img
            src={!props.collapsed ? menu_open : menu_close}
            alt="menu_icon"
          />
        </Col>
        <Col xs={16} sm={16} md={16} lg={16} xl={16} className="badge">
          <Badge
            count={5}
            style={{ backgroundColor: "#ea7a9a", fontWeight: "bold" }}
          >
            <BellOutlined
              style={{
                fontSize: "30px",
                color: "rgb(76, 129, 71)",
                backgroundColor: "hsla(0,0%,98%,.8)",
                borderRadius: "50%",
                padding: "10px",
              }}
            />
            
          </Badge>
          <Badge
            count={5}
            style={{ backgroundColor: "#ea7a9a", fontWeight: "bold" }}
          >
            <BellOutlined
              style={{
                fontSize: "30px",
                color: "rgb(76, 129, 71)",
                backgroundColor: "hsla(0,0%,98%,.8)",
                borderRadius: "50%",
                padding: "10px",
              }}
            />
            
          </Badge>
          <Badge
            count={5}
            style={{ backgroundColor: "#ea7a9a", fontWeight: "bold" }}
          >
            <BellOutlined
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
        <Col xs={4} sm={4} md={4} lg={4} xl={4} className="avatar-container">
          <Dropdown
            overlay={menu}
            placement="bottom"
            className="avatar-dropdown"
          >
            <div style={{ display: "flex" }}>
              <Avatar
                className="avatar"
                size={{ xs: 35, sm: 45, md: 45, lg: 45, xl: 45, xxl: 45 }}
                icon={<AntDesignOutlined />}
              />
              <Space
                direction="vertical"
                size={[8, 0]}
                className="avatar-details"
              >
                <Typography.Text className="avatar-name">
                  DevProMax
                </Typography.Text>
                <Typography.Text className="avatar-role">Admin</Typography.Text>
              </Space>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default HeaderComponent;
