import Layout from "../components/layout";


export default function ApiExamplePage() {
  return (
    <Layout>
      <h1>API Example</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      <p>
        <em>You must be signed in to see responses.</em>
      </p>
      <h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe src="/api/examples/session" />
      <h2>JSON Web Token</h2>
      <p>/api/examples/jwt</p>
      <iframe src="/api/examples/jwt" />
      <p>/api/examples/jwt-encrypted</p>
      <iframe width={600} height={300} src="/api/examples/jwt-encrypted" />
      <iframe width={600} height={300} src="/api/examples/posts" />
    </Layout>
  );
}
