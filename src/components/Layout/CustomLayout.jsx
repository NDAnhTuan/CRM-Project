import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, theme,Image} from 'antd';
import { Typography } from 'antd';
import "./CustomLayout.css"
import logo from '../../assets/logo.jpg';
import { useMenuLayoutStore } from '../../hooks/useStore';
const { Header, Sider, Content } = Layout;
const {Title} = Typography;
function CustomLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {selectedTitle, setSelectedTitle} = useMenuLayoutStore()
  //useState('Products'); // Tiêu đề mặc định
  const navigate = useNavigate();

  const menuItems = [
    { key: 'Products', icon: <UnorderedListOutlined />, label: 'Products' },
    { key: 'Customers', icon: <UserOutlined />, label: 'Customers' },
    { key: 'Deals', icon: <UserOutlined />, label: 'Deals' },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="full-screen-min">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        
        <div className='layout-logo'>
            <Image  src={logo} alt='Logo'/>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          onSelect={({ key }) => {
            const selectedItem = menuItems.find(item => item.key === key);
            if (selectedItem) setSelectedTitle(selectedItem.label);
            navigate(`/${key}`); // Chuyển trang khi chọn menu
          }}
        />
      </Sider>
      <Layout>
        <Header 
          className='Header-Layout'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        > 
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Title level={3}>{selectedTitle}</Title> 
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> {/* Render nội dung trang */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default CustomLayout;