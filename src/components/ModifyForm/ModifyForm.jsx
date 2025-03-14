import React, {useEffect, useState} from 'react';
import { Button, Form, Input, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { addProduct, fetchProduct, updateProduct } from '../../services/api/ProductService';
import { addUser, fetchUser, updateUser } from '../../services/api/UserService';

function ModifyForm(props) {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const {data} = useQuery({
      queryKey: [props.url],
      queryFn: () => props.url === "/Products" ? fetchProduct(props.id) : fetchUser(props.id),
    }) 

  const formFieldsMap = {
    "/Products": [
      { name: "title", label: "Title", placeholder: "Enter title" },
      { name: "price", label: "Price", placeholder: "Enter price" },
      { name: "description", label: "Description", placeholder: "Enter description" },
      {
        name: "image",
        label: "Upload Image",
        component: (
          <Upload 
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          listType="picture-card"
          beforeUpload={() => false}
          >
            {fileList.length < 1 && <Button icon={<UploadOutlined />}>Click to Upload</Button>}
          </Upload>
        ),
      }
    ],
    "/Customers": [
      { name: "name", label: "Name", placeholder: "Enter name" },
      { name: "email", label: "Email", placeholder: "Enter email" },
      { name: "phone", label: "Phone", placeholder: "Enter phone number" }
    ]
  };
   // Lấy data tương ứng hoặc mặc định về users nếu URL không khớp
   const formFields = formFieldsMap[props.url] || [];

   useEffect(() => {
    const currentData = data;
    if (currentData) {
      form.setFieldsValue(currentData);
      if (currentData.image) {
        setFileList([{ uid: "-1", name: "image.png", status: "done", url: currentData.image }]);
      }
    }
  }, [ data,form, props.id]);

  const onFinish = async (values) => {
    try {
      if (props.url === "/Customers") {
        if (!props.id) await addUser(values);
        else {
          await updateUser(props.id, values); // Gọi API update User
          console.log("User updated:", values);}
      } 
      else if (props.url === "/Products") {
        if(!props.id) await addProduct(values);
        else {
          await updateProduct(props.id, values);
          console.log("User updated:", values);
        }
      }
      else {
        console.log("Updating product (chưa xử lý)");
      }
      navigate(props.url);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  return (
    <Form
      layout='vertical'
      form={form}
      initialValues={{
        layout: 'vertical'
      }}
      onFinish={onFinish}
    >
      {formFields.map((field) => (
        <Form.Item key={field.name} label={field.label} name={field.name}>
          {field.component || <Input placeholder={field.placeholder} />}
        </Form.Item>
      ))}
      <Form.Item>
        <Space>
            <Button type="primary" onClick={() => navigate(props.url)} danger>Cancel</Button>
            <Button type="primary" htmlType="submit">{props.id ? "Save" : "Create"}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default ModifyForm;