import { Layout } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const MainLayout = () => {
 

  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
