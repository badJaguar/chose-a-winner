import Layout from "../components/layout";
import { Button } from '@mui/material';

export default function IndexPage() {
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        <Button variant='contained'>Home</Button>

        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
    </Layout>
  );
}
