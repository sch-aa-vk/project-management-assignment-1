import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/account`;

export const createAccount = async (accountType: 'savings' | 'checking', accountName: string, balance: number, token: string) => {
  const response = await axios.post(`${API_URL}/create`, { accountType, accountName, balance }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAccountDetails = async (accountId: string, token: string) => {
  const response = await axios.get(`${API_URL}/${accountId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAccounts = async (token: string) => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
