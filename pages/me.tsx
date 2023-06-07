"use strict"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function MePage() {
  const { data } = useSession()

  //https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}
