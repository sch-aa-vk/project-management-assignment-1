import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import { signup } from "../services/authService";
import { AxiosError } from "axios";
import { NotificationsContext } from "../services/notificationsContext";
import { ContentWrapper } from "../components/ContentWrapper";
import { useNavigate } from "react-router";

export const SignUp: React.FC = () => {
  const { openNotification } = useContext(NotificationsContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: {
    email: string;
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await signup(values.email, values.username, values.password);
      openNotification(
        "Signup Successful",
        "Your account created successfully!",
        "success"
      );
      navigate("/login");
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string; error: string }>).response?.data
          ?.message || "An unexpected error occurred";
      const errorDescription = (
        error as AxiosError<{ message: string; error: string }>
      ).response?.data?.error.includes("duplicate key");
      openNotification(
        "Signup Failed",
        errorDescription
          ? "User with given email or username already exist"
          : errorMessage,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <Form name="signup" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </ContentWrapper>
  );
};

export default SignUp;
