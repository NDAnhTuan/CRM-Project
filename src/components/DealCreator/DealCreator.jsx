import { useState } from "react";
import { Modal, List, Avatar, Button, Typography, InputNumber, Row, Col } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUsers } from "../../services/api/UserService";
import { fetchAllProducts } from "../../services/api/ProductService";
import {addDeal} from "../../services/api/DealService"
import {ArrowRightOutlined} from "@ant-design/icons"
import { useUserStore } from "../../hooks/useStore";


export default function DealCreator(props) {
  

    const { data: customers, isLoading: isCustomerLoading } = useQuery({
      queryKey: ['users/deals/add'],
      queryFn: fetchUsers
    });
    
    const { data: products, isLoading: isProductLoading } = useQuery({
      queryKey: ['products/deals/add'],
      queryFn: fetchAllProducts
    });
    const { mutate: createDeal, isLoading } = useMutation({
      mutationFn: addDeal,
      onSuccess: (dealId) => {
        props.messageApi.success(`Deal created successfully! ID: ${dealId}`, 3);
        props.onCancel(false); // Đóng modal sau khi tạo thành công
      },
      onError: (error) => {
        console.error("Error creating deal: ", error);
        props.messageApi.error("Failed to create deal. Please try again.");
      },
    });
  const [step, setStep] = useState(1);
  const {selectedUser, setSelectedUser} = useUserStore();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCustomerSelect = (customer) => {
    setSelectedUser(customer);
    setStep(2);
  };

  const handleProductChange = (id , price, title, quantity) => {
    setSelectedProducts((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (quantity > 0) updated.push({ id,price, title, quantity });
      console.log(updated);
      return updated;
    });
  };

  const handleCreateDeal = () => {
    if (selectedProducts.length === 0) {
      props.messageApi.warning("Please select at least one product.");
      return;
    }
    console.log("Creating Deal:", { selectedUser, selectedProducts });
    // props.messageApi.success("Deal created successfully!", 3)
    // props.onCancel(false);
    createDeal({ selectedUser, selectedProducts });
    
  };

  return (
    <Modal mask={false} open={props.open} footer={null} onCancel={() => props.onCancel(false)}>
      {step === 1 && (
        <div>
          <Typography.Title level={4}>Select Customer</Typography.Title>
          <List
            itemLayout="horizontal"
            dataSource={customers}
            loading={isCustomerLoading}
            renderItem={(customer) => (
              <List.Item onClick={() => handleCustomerSelect(customer)}>
                <List.Item.Meta
                  avatar={<Avatar>{customer.name[0]}</Avatar>}
                  title={customer.name}
                  description={customer.email}
                />
                <ArrowRightOutlined  style={{ fontSize: "24px",color: "#1677FF" }}/>
              </List.Item>
            )}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <Typography.Title level={4}>Select Products</Typography.Title>
          <List
            itemLayout="horizontal"
            dataSource={products}
            loading={isProductLoading}
            renderItem={(product) => (
              <List.Item style={{ padding: '12px 16px' }}>
                <Row style={{ width: '100%' }} align="middle" gutter={16}>
                  {/* Thông tin sản phẩm */}
                  <Col span={8}>
                    <div style={{ fontWeight: '600' }}>{product.title}</div>
                    <div style={{ color: '#6b7280' }}>In stock: {product.stock}</div>
                  </Col>
            
                  {/* Giá sản phẩm */}
                  <Col span={8} style={{ textAlign: 'right', fontWeight: '500' }}>
                    {"Đơn giá: "+product.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Col>
                  
                  {/* Input số lượng */}
                  <Col span={8} style={{ textAlign: 'right' }}>
                    <InputNumber
                      min={0}
                      max={product.stock}
                      onChange={(value) => handleProductChange(product.id, product.price, product.title, value)}
                      style={{ width: '100px' }}
                    />
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          
          <Button type="primary" loading={isLoading} onClick={handleCreateDeal} style={{ marginTop: "16px" }}>
            Create Deal
          </Button>
        </div>
      )}
    </Modal>
  );
}

