import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Space, Button } from 'antd';


function ModifyButton(record) {
    const navigate = useNavigate();
    const handleClickDeleteButton = (record) => {
        record.remove(record.item.id);
    }
    const handleClickEditButton = (record) => {
        if (record.type === "Products") {
            navigate(`/Products/${record.item.id}`)
        }
        else {
            navigate(`/Customers/${record.item.id}`)
        }
    }
    return (
        <Space>
            <Button type="primary" onClick={() => handleClickEditButton(record)} >Edit</Button>
            <Button type="primary" onClick={() => handleClickDeleteButton(record)} danger> Delete </Button>
        </Space>
    );
}

export default ModifyButton;