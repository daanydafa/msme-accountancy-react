import { authService } from './AuthServices';

export const login = async (credentials) => {
  try {
    const response = await authService.http.post(`/login`, credentials);
    return response.data.data.tokenData;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const orders = async () => {
  try {
    const response = await authService.http.get(`/orders`);
    const ordersData = response.data?.data || [];
    return ordersData;

  } catch (error) {
    throw error.response?.data?.message || 'Get orders failed';
  }
};

export const ongoingOrders = async () => {
  try {
    const response = await authService.http.get(`/orders/ongoing`);
    const ordersData = response.data?.data || [];
    return ordersData;
  } catch (error) {
    throw error.response?.data?.message || 'Get orders failed';
  }
};

export const showOrder = async (id) => {
  try {
    const response = await authService.http.get(`/orders/${id}`);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Get order detail failed';
  }
};

export const getTransactionsByMonth = async (date) => {
  try {
    const params = date.year ? `${date.month}/${date.year}` : `${date.month}`
    const response = await authService.http.get(`/orders/${params}`);;

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Get transaction by month failed';
  }
};

export const getTransactionsByList = async (credentials) => {
  try {
    const response = await authService.http.post(`/transactions/list`, credentials);;

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Get transaction by list failed';
  }
};

export const getUserData = async () => {
  try {
    const response = await authService.http.get(`/user`);;
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Get user data failed';
  }
};

export const createTransaction = async (credentials) => {
  try {
    const response = await authService.http.post(`/transactions`, credentials);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Create transaction failed';
  }
};

export const updateReimbursementStatus = async (credentials) => {
  try {
    const response = await authService.http.put(`/transactions/reimbursement_status`, credentials);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Update reimbursement status failed';
  }
};

export const createOrder = async (credentials) => {
  try {
    const response = await authService.http.post(`/orders`, credentials);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Create transaction failed';
  }
};


export const showReportsByMonth = async (month, year) => {
  try {
    const response = await authService.http.get(`/reports/${month}/${year}`);
    return response.data;
  } catch (error) {
    throw error.response?.message || 'Get reports failed';
  }
};