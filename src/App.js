import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './pages/Products/Products'
import Customers from './pages/Customers/Customers';
import CustomLayout from './components/Layout/CustomLayout';
import Deals from './pages/Deals/Deals';



function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<CustomLayout />}>
          <Route index= {true} element={<Products />} />
          <Route path ="/Products" element={<Products />} />
            <Route path ="/Products/:id" element={<Products />} />
            <Route path="/Products/add" element = {<Products/>} />
          <Route path ="/Customers" element={<Customers />} />
            <Route path ="/Customers/:id" element={<Customers />} />
            <Route path="/Customers/add" element = {<Customers/>} />
          <Route path="/Deals" element = {<Deals/>} />
            <Route path="/Deals/add" element = {<Deals/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
