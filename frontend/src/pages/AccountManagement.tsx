import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Input, List, Select, Form, Modal } from "antd";
import styled from "styled-components";
import { createAccount, getAccounts } from "../services/accountService";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { tokenSelector } from "../store/selectors/authSelectors";
import { NotificationsContext } from "../services/notificationsContext";
import { AxiosError } from "axios";
import { ContentWrapper } from "../components/ContentWrapper";
import { IAccount } from "../store/interfaces/account";
import { getAllTransactions, getTransactions, transferMoney } from "../services/transactionService";
import { ITransaction } from "../store/interfaces/transactions";
import useAppDispatch from "../store/hooks/useAppDispatch";
import { logout } from "../store/slices/authSlice";

const ManagementContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
`;

const ListItems = styled(List.Item)`
  color: white !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  &:last-child {
    padding-bottom: 24px !important;
  }
`;

const AccountManagement: React.FC = () => {
  const { openNotification } = useContext(NotificationsContext);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [accountName, setAccountName] = useState<string>("");
  const [accountType, setAccountType] = useState<"savings" | "checking">(
    "savings"
  );
  const [balance, setBalance] = useState<number>(0);
  const [fromAccount, setFromAccount] = useState<string>("");
  const [toAccount, setToAccount] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);
  const token = useAppSelector(tokenSelector) || "";
  const dispatch = useAppDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateAccount = async () => {
    try {
      await createAccount(accountType, accountName, balance, token);
      openNotification("Account created successfully!", "", "success");
      await Promise.all([fetchAccounts(), fetchAllTransactions()]);
      // Clear input fields
      setAccountName("");
      setAccountType("savings");
      setBalance(0);
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "An unexpected error occurred";
      openNotification("Failed to create account", errorMessage, "error");
    }
  };

  const handleTransferMoney = async () => {
    try {
      await transferMoney(fromAccount, toAccount, amount, token);
      openNotification("Money transferred successfully!", "", "success");
      await Promise.all([fetchAccounts(), fetchAllTransactions()]);
      // Clear input fields
      setFromAccount("");
      setToAccount("");
      setAmount(0);
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "An unexpected error occurred";
      openNotification("Failed to transfer money", errorMessage, "error");
    }
  };

  const fetchAccounts = useCallback(async () => {
    try {
      const data = await getAccounts(token);
      setAccounts(data);
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        dispatch(logout());
        return;
      }
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "An unexpected error occurred";
      openNotification("Failed to fetch accounts", errorMessage, "error");
    }
  }, [token, openNotification, dispatch]);

  const fetchTransactions = async (name: string) => {
    try {
      const transactions = await getTransactions(name, token);
      setTransactions(transactions);
      showModal();
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "An unexpected error occurred";
      openNotification("Failed to fetch transactions", errorMessage, "error");
    }
  };

  const fetchAllTransactions = useCallback(async () => {
    try {
      const transactions = await getAllTransactions(token);
      setAllTransactions(transactions);
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        dispatch(logout());
        return;
      }
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "An unexpected error occurred";
      openNotification("Failed to fetch transactions", errorMessage, "error");
    }
  }, [token, openNotification, dispatch]);

  useEffect(() => {
    fetchAccounts();
    fetchAllTransactions();
  }, [fetchAccounts, fetchAllTransactions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateAccount();
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTransferMoney();
  };

  return (
    <ContentWrapper justifyContent="start">
      <ManagementContainer>
        <ContentWrapper justifyContent="space-between" padding="0px">
          <Title>Account Management</Title>
          <Form layout="inline" onSubmitCapture={handleSubmit}>
            <Form.Item>
              <Input
                placeholder="Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
              />
            </Form.Item>
            <Form.Item>
              <Select
                value={accountType}
                onChange={(value) => setAccountType(value)}
              >
                <Select.Option value="savings">Savings</Select.Option>
                <Select.Option value="checking">Checking</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </ContentWrapper>
        <ContentWrapper justifyContent="space-between" padding="0px">
          <Title>Transfer Money</Title>
          <Form layout="inline" onSubmitCapture={handleTransferSubmit}>
            <Form.Item>
              <Input
                placeholder="From Account"
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="To Account"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Transfer Money
              </Button>
            </Form.Item>
          </Form>
        </ContentWrapper>
        <List
          dataSource={accounts}
          renderItem={(item: IAccount) => (
            <ListItems>
              {item.accountName} - {item.accountType} - {item.balance}
              <Button
              type="link"
              onClick={async () => {
                await fetchTransactions(item.accountName);
              }}
              >
              View Transactions
              </Button>
            </ListItems>
          )}
        />
        <List
        header={<Title>All Transaction History</Title>}
          dataSource={allTransactions}
          renderItem={(item: ITransaction) => (
            <ListItems>
              {item.amount} - {item.type} - {item.name} - {item.createdAt}
            </ListItems>
          )}
        />
      </ManagementContainer>
      <Modal title="Transaction History" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <List
          dataSource={transactions}
          renderItem={(item: ITransaction) => (
            <List.Item>
              {item.amount} - {item.type} - {item.createdAt}
            </List.Item>
          )}
        />
      </Modal>
    </ContentWrapper>
  );
};

export default AccountManagement;
