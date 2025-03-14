import React, { useEffect, useState } from 'react';
import { Table, Collapse, Spin, FloatButton, message  } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'; 
import { fetchDeals } from '../../services/api/DealService';
import './DealList.css'
import DealCreator from '../DealCreator/DealCreator';
const { Panel } = Collapse;
function DealList() {
  const [messageApi, contextHolder] = message.useMessage();
  const {data, isLoading} = useQuery({
    queryKey:['deals'],
    queryFn: fetchDeals,
    staleTime: 1000,       // 1 giây, sau đó sẽ đánh dấu dữ liệu là cũ
    refetchInterval: 2000, // Tự động fetch lại mỗi 3 giây
    refetchOnWindowFocus: true, // Refetch khi quay lại tab trình duyệt
    cacheTime: 0,          // Không cache dữ liệu cũ
  })
  const [deals, setDeals] = useState([]);

useEffect(() => {
  if (data) {
    setDeals(data);
  }
}, [data]);

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "title", key: "title" },
    { title: "Đơn giá", dataIndex: "price", key: "price" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Tổng tiền",
      key: "total",
      render: (_, record) => (record.price * record.quantity).toLocaleString("vi-VN") + " ₫",
    },
  ];

  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);


  return (
    <div style={{ padding: "24px", backgroundColor: "#f9fafb" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937" }}>
        🛍️ Thông Tin Đơn Hàng
      </h1>
  
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
      ) : (
        <Collapse accordion style={{ backgroundColor: "#ffffff", borderRadius: "12px" }}>
          {deals.map((item, dealIndex) => (
            <Panel
              header={
                <span style={{ color: "#374151", fontWeight: "500" }}>
                  Khách hàng: {item.name} - Ngày đặt:{" "}
                  {new Date(item.orderDate?.toDate()).toLocaleDateString()}
                </span>
              }
              key={dealIndex}
              style={{
                background: "#ffffff",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <Table
                columns={columns}
                dataSource={item.products}
                rowKey={(record) => record.title}
                pagination={false}
              
                rowClassName="hover-floating-effect"
              />
            </Panel>
          ))}
        </Collapse>
      )}
      <FloatButton  type="primary" icon=<PlusOutlined /> onClick={openModal} />
      {/* Modal chứa DealCreator */}
      {/* <Modal
        title="Tạo Deal Mới"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        maskClosable={false} // Không tắt khi bấm ra ngoài
        // width={800}
      > */}
      {contextHolder}
      {isModalVisible && <DealCreator open={isModalVisible} messageApi={messageApi}  onCancel={setIsModalVisible} />}
      {/* </Modal> */}
    </div>
  );
};
export default DealList;