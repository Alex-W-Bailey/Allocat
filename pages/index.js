import Layout from "../components/Layout.js";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Login from "../pages/login";

const Index = props => (
  <Layout>
    <Login />
  </Layout>
);

export default Index;
