import React, { useCallback, useState } from 'react';
// import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  LayoutOutlined,
  TagsOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';

const { Header, Sider, Content } = Layout;

// const name = '[Your Name]';
// export const siteTitle = 'Next.js Sample Website';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = useCallback(() => setCollapsed(!collapsed), [collapsed]);
  const router = useRouter();
  const activePathname = router.asPath.substring(1);
  const onMenuClick = (item) => {
    router.push(`/${item.key}`);
  };

  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <Link href="/">Admin Drink.</Link>
        </div>
        <Menu theme="dark" mode="inline" onClick={onMenuClick} selectedKeys={[activePathname]}>
          <Menu.Item key="machines" icon={<LayoutOutlined />}>
            Vending Machines
          </Menu.Item>
          <Menu.Item key="products" icon={<TagsOutlined />} active>
            All Products
          </Menu.Item>
          <Menu.Item key="reports" icon={<BarChartOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
