import Head from "next/head";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "../firebase/firebase";
import Router from "next/router";
import { useEffect } from "react";

export default function signup() {
  useEffect(() => {
    if (firebase.isLoggedIN()) {
      Router.push("/dashboard");
    }
  });

  async function doSignup(values) {
    console.log(values); // Expected output {name: "Tuhin", email: "me@thetuhin.com", password: "123456789"}
    message.loading({ key: "signup", content: "Signing up !" }); // Showing logging in message
    try {
      await firebase.register(values);
      message.success({ key: "signup", content: "Signed up 🎉" }); // if success
      Router.push("/login");
    } catch (error) {
      // if error
      message.error({
        key: "signup",
        content: error.message || "Something went wrong !",
      });
    }
  }

  return (
    <>
      <Head>
        <title>Create Account | Firenext</title>
      </Head>
      <main className="fullscreenflexmiddle">
        <h2 style={{ fontSize: 25, marginBottom: 30 }}>Create Account</h2>
        <Form
          name="signup"
          style={{ width: "100%", maxWidth: 350 }}
          initialValues={{ remember: true }}
          onFinish={doSignup} // When click the Signup Button
        >
          <Form.Item name="name" rules={[{ required: true, message: "" }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: "" }]}>
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
}
