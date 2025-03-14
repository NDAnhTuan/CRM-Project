import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CustomersList from '../../components/CustomersList/CustomersList';
import ModifyForm from '../../components/ModifyForm/ModifyForm';

function Customers() {
  const {id} = useParams();
  const location = useLocation();
  if (location.pathname === "/Customers/add") {
    return <ModifyForm url="/Customers" ></ModifyForm>
  }
  return (
   id? <ModifyForm url="/Customers" id={id}></ModifyForm> : <CustomersList></CustomersList>
  );
};
export default Customers;