import { BrowserRouter, Routes, Route, Router, Navigate, } from 'react-router-dom';
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Reports from './Pages/Reports';
import OrderDetail from './Pages/OrderDetail';
import InputTransaction from './Pages/InputTransaction';
import InputOrder from './Pages/InputOrder';
import ProfileDetail from './Pages/ProfileDetail';
import Loading from './Components/Loading';
import { AuthProvider, useAuth } from './Contexts/AuthContext';

import MainLayout from './Layouts/MainLayout';
import DetailedLayout from './Layouts/DetailedLayout';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute> <Orders /> </PrivateRoute>} />
            <Route path="/reports/:month/:year" element={<PrivateRoute> <Reports /> </PrivateRoute>} />
          </Route>
          <Route element={<DetailedLayout />}>
            <Route path="/orders/:id/add-transaction" element={<PrivateRoute> <InputTransaction /> </PrivateRoute>} />
            <Route path="/orders/add" element={<PrivateRoute> <InputOrder /> </PrivateRoute>} />
            <Route path="/orders/:id" element={<PrivateRoute> <OrderDetail /> </PrivateRoute>} />
            <Route path="/profile/" element={<PrivateRoute> <ProfileDetail /> </PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;