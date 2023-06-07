import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import Layout from "../components/layout"
import { PostData } from "../types/Post";

interface MePageProps {
  posts: PostData
}

export default function MePage(props: MePageProps) {
  const {posts} = props
console.log(posts.data.filter(s =>s.media_url));

  return (
    <Layout>
      <div>
        {
posts.data.map(item => (
  <Image width={140} height={60} src={item.media_url} alt={item.permalink} key={item.id} />
))
        }
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = await getToken({ req: context.req });
  
  const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token?.access_token}`);
  const posts = await res.json();


  return {
    props: {
      posts,
    },
  }
}