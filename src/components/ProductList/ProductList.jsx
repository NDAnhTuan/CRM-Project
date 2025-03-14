import React, {useEffect, useState} from 'react';
import {  List, FloatButton } from 'antd';
import './ProductList.css'
import {PlusOutlined} from '@ant-design/icons'

import { fetchAllProducts } from '../../services/api/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useProductStore } from '../../hooks/useStore';
import ModifyButton from '../ModifyButton/ModifyButton';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  
  const {data, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchAllProducts(),
  })
  const navigate = useNavigate();
  const {products, setProducts, removeProduct} = useProductStore();
  const [prevData, setPrevData] = useState(null);
  
  useEffect( () => {
      if (data && data !== prevData) {
        console.log(data)
        
        setProducts(data ? data.map((item) => ({
          id: item.id,
          title: item.title || 'No title',
          description: `Price: ${item.price}` || 'No price',
          content: item.description || 'No description',
          image: item.image || ''
        })) : products);
        
        setPrevData(data);
      }
    }, [data, prevData, products, setProducts]);

  return ( 
    <div>
      <List
        itemLayout="vertical"
        loading={isLoading}
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={products}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
            <List.Item
              className='hover-floating-effect'
              extra={
                <img
                  width={100}
                  alt="logo"
                  src={item.image}
                />
              }
            >

              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
              <List.Item>
                <ModifyButton item={item} remove={removeProduct} type="Products"></ModifyButton>
              </List.Item> 
            </List.Item>
        )}
      />
      <FloatButton  type="primary" icon=<PlusOutlined /> onClick={() => navigate("/Products/add")} />
  </div>
  
);
}
export default ProductList;