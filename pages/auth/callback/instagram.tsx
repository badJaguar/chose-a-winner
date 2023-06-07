import Layout from "../../../components/layout";
import {  getProviders, useSession } from "next-auth/react"
import { useEffect } from "react";

export default function Page() {
const {data, status} = useSession()

  return (
    <Layout>
        <pre>{JSON.stringify(data?.user.token, null, 2)}</pre>
    </Layout>
  )
}
