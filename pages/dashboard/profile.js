import { Layout, Card, message } from "antd";
import Header from "../../components/header";
import Head from "next/head";
import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import firebase from "../../firebase/firebase";
import Router from "next/router";

export default function profile() {
  const profile = firebase.getProfile();

  return (
    <>
      <Head>
        <title>Profile | Firenext</title>
      </Head>
      <Layout>
        <Header activeKey={"2"} />
        <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div className="site-layout-background mainlayout">
            <div className="container">
              <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <DeleteOutlined
                    key="delete"
                    onClick={async () => {
                      var trytodelete = await firebase.deleteAccount();
                      if (trytodelete) {
                        message.success("User deleted");
                        Router.push("/create-account");
                      } else {
                        message.error("Something went wrong !");
                      }
                    }}
                  />,
                  <KeyOutlined
                    key="changepass"
                    onClick={async () => {
                      // Build your logic
                    }}
                  />,
                ]}
              >
                <Card.Meta
                  title={
                    <>
                      {profile.name} (
                      {profile.verified ? (
                        "verified"
                      ) : (
                        <span
                          style={{ color: "skyblue", cursor: "pointer" }}
                          onClick={async () => {
                            var sendverification =
                              await firebase.sendVerification();
                            if (sendverification) {
                              message.success("Verification email sent");
                            } else {
                              message.error(
                                "Something went wrong while sending verification"
                              );
                            }
                          }}
                        >
                          not verified
                        </span>
                      )}
                      )
                    </>
                  }
                  description={profile.email}
                />
              </Card>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
