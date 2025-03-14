import React from 'react';
import ModifyForm from '../../components/ModifyForm/ModifyForm';
import { useLocation, useParams } from 'react-router-dom';
import DealList from '../../components/DealList/DealList';
import DealCreator from '../../components/DealCreator/DealCreator';




function Deals() {
  const {id} = useParams();
  const location = useLocation();
  if (location.pathname === "/Deals/add") {
    return <DealCreator></DealCreator>
  }
  return (
    id ? <ModifyForm url="/Deals" id={id} ></ModifyForm> : <DealList></DealList>
    
  )

  
  
}

export default Deals;