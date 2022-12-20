import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

import Landing from './pages/Landing';
import ProductDetail from './pages/ProductDetail';
import MyCart from './pages/MyCart';
import Profile from './pages/Profile';
import AddProduct from './admin/AddProduct';
import AddToping from './admin/AddToping';
import Transaction from './admin/Transaction';


// Init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate();

  // Init user context 
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail-product/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-toping" element={<AddToping />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/mycart" element={<MyCart />} />
      </Routes>
    </>
  );
}

export default App;
