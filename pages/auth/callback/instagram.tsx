import Layout from "../../../components/layout";
import { getCsrfToken, getProviders,  useSession } from "next-auth/react"
import { useEffect } from "react";

export default function Page() {


useEffect(() => {
  getProviders().then(res => {
    console.log(res);
  })
}, [])

  return (
    <Layout>
        {/* <pre>{`${data?.user}`}</pre>
        <pre>{session}</pre> */}
    </Layout>
  )
}
