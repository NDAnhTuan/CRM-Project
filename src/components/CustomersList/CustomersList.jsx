import React, { useEffect, useState } from 'react';
import { Table, FloatButton } from 'antd';
import { fetchUsers } from '../../services/api/UserService';
import { useQuery } from '@tanstack/react-query'; 
import { useUserStore } from '../../hooks/useStore';
import ModifyButton from '../ModifyButton/ModifyButton';
import {PlusOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

function CustomersList() {
  const [prevData, setPrevData] = useState(null);
  const {users, setUsers, removeUser} = useUserStore();
  const navigate = useNavigate();

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const  {data, isPending} = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
    
  });
  useEffect( () => {
    if (data && data !== prevData) {
      // setTableParams({
      //   ...tableParams,
      //   pagination: {
      //     ...tableParams.pagination,
      //     // total: 50,
      //     // 50 is mock data, you should read it from server
      //     total: data ? data.length : 0,
      //   },
      // })
      setUsers(data);
      setPrevData(data);
    }
  }, [data, prevData, setUsers, tableParams, users]);
  
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   clearUsers();
    // }
  };


  const columns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: (name) => `${name}`,
      width: '20%',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <ModifyButton item={record} remove={removeUser}></ModifyButton>     
      ),
    },
  ];

  return (
    <div>
   
    <Table
      columns={columns()}
      rowKey={(record) => record.id}
      dataSource={users}
      pagination={tableParams.pagination}
      loading={isPending}
      onChange={handleTableChange}
      title={() => 'Header'}
      footer={() => 'Footer'}
    />
    <FloatButton  type="primary" icon=<PlusOutlined /> onClick={() => navigate("/Customers/add")} />
    </div>
  );
};
export default CustomersList;