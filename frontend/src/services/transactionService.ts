import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/transaction`;

export const transferMoney = async (fromAccount: string, toAccount: string, amount: number, token: string) => {
  const response = await axios.post(`${API_URL}/transfer`, { fromAccountName: fromAccount, toAccountName: toAccount, amount }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const getTransactions = async (accountName: string, token: string) => {
  const response = await axios.get(`${API_URL}/history/${accountName}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const getAllTransactions = async (token: string) => {
  const response = await axios.get(`${API_URL}/history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}