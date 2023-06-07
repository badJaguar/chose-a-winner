import Layout from "../../../components/layout";
import {   useSession } from "next-auth/react"

export default function Page() {
const { data } = useSession()

  return (
    <Layout>
        <pre>{data?.access_token}</pre>
    </Layout>
  )
}
