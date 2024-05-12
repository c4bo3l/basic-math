import { HomeOutlined, NumberOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  multiplicationPath,
  multiplicationTablePath,
  multiplicationTestPath,
  rootPath,
} from "./router/routeLink";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const menus: ItemType<MenuItemType>[] = [
    {
      key: rootPath,
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: multiplicationPath,
      icon: <NumberOutlined />,
      label: "Multiplication",
      children: [
        {
          key: multiplicationTablePath,
          label: "Table",
        },
        {
          key: multiplicationTestPath,
          label: "Tests",
        },
      ],
    },
  ];

  return (
    <Layout
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[rootPath]}
          items={menus}
          onSelect={(x) => navigate(x.key)}
        />
      </Sider>
      <Layout
        style={{
          padding: "8px 8px",
          overflow: "auto",
        }}
      >
        <Content
          style={{
            padding: 24,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
