import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ModifyForm from '../../components/ModifyForm/ModifyForm';
import { useLocation, useParams } from 'react-router-dom';

function Products() {
  const {id} = useParams();
  const location = useLocation();
  if (location.pathname === "/Products/add") {
    return <ModifyForm url="/Products" ></ModifyForm>
  }
  return (
    id ? <ModifyForm url="/Products" id={id} ></ModifyForm> : <ProductList></ProductList>
    
  )
}
export default Products;