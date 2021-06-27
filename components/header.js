import { Layout, Menu } from "antd";
import Router from "next/router";
import { useEffect } from "react";
import firebase from "../firebase/firebase";
import Link from "next/link";

export default function header(props) {
  // Header is common component for every routes, that's why let's build the fallback to login logic if user is not loggedin

  useEffect(() => {
    if (!firebase.isLoggedIN()) {
      Router.push("/login");
    }
  });

  return (
    <Layout.Header className="headerContainer">
      <h1>Firenext</h1>
      <Menu
        style={{ float: "right" }}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[props.activeKey]}
      >
        <Menu.Item key="1">
          <Link href="/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link href="/dashboard/profile">Profile</Link>
        </Menu.Item>

        <Menu.Item
          key="3"
          onClick={async () => {
            // Logout
            await firebase.logout();
            Router.push("/login");
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}
