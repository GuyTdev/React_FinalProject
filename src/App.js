import './App.css';
import { Route, Routes, useNavigate} from 'react-router-dom'
import LoginForm from './components/pages/auth/LoginForm'
import RegisterForm from './components/pages/auth/RegisterForm';
import HomePage from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Products from './components/pages/Products';
import Customers from './components/pages/Customers';
import Purchases from './components/pages/Purchases';
import EditProduct from './components/pages/EditProduct';
import EditCustomer from './components/pages/EditCustomer';

function App() {
  const navigate =useNavigate();
  return (
    <div className="App">
      <h1 className='app_title'onClick={()=>navigate('/dashboard')}>Online store</h1>
      <Routes>
        {/* public routes */}
          <Route path='/' element={<HomePage />}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/register' element={<RegisterForm />}/>
        {/* private registered users/admin routes */}
          <Route path='/dashboard' element={<Dashboard />}>
              <Route path='products' element={<Products/>}/>
              <Route path='customers' element={<Customers/>}/>
              <Route path='purchases' element={<Purchases/>}/>
              {/* private registered admin only routes */}
              <Route path='edit_product/:p_id' element={<EditProduct/>}/>
              <Route path='edit_customer/:c_id' element={<EditCustomer/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
