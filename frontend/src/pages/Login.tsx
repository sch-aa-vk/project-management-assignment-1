import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import { NotificationsContext } from "../services/notificationsContext";
import { ContentWrapper } from "../components/ContentWrapper";
import useAppDispatch from "../store/hooks/useAppDispatch";
import { login } from "../services/authService";
import { AxiosError } from "axios";

const Login: React.FC = () => {
  const { openNotification } = useContext(NotificationsContext);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { token } = await login(values.email, values.password);
      dispatch({ type: "auth/login", payload: token });
      openNotification(
        "Login Successful",
        "You have successfully logged in",
        "success"
      );
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string; error: string }>).response?.data
          ?.message || "An unexpected error occurred";
      openNotification("Login Failed", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <Form name="login" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </ContentWrapper>
  );
};

export default Login;
