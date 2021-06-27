import { Layout, Result } from "antd";
import Header from "../../components/header";
import Head from "next/head";

export default function dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Firenext</title>
      </Head>
      <Layout>
        <Header activeKey={"1"} />
        <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div className="site-layout-background mainlayout">
            <div className="container">
              <Result
                style={{ marginTop: 50 }}
                status="success"
                title="Yes you are logged in !"
                subTitle="If, you learnt how to build this yourself, Congratulations to you !"
              />
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
