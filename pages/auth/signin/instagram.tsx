import Layout from "../../../components/layout";
import { signIn } from "next-auth/react"

export default function Page() {
  return (
    <Layout>
       <button onClick={() => signIn("instagram", {callbackUrl: "https://f94e-37-214-75-36.ngrok-free.app/auth", redirect: true} )}>
           Sign in
        </button>
    </Layout>
  )
}
