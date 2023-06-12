import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import Layout from "../components/layout";
import { getAllMedia } from "../lib/media/getAll";
import { Post } from "../types/Post";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { signOut } from "next-auth/react";
import Caption from "../components/caption";
import Modal from "../components/modal";
import noImage from '../public/images/no-img.png';

const chips = "text-sm md:text-lg inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2";

interface MePageProps {
  posts: Post[];
}

export default function MePage(props: MePageProps) {
  const { posts } = props;

  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<Post | undefined>();

  const openClickHandle = (item: Post) => {
    setOpen(true);
    setPost(item);
  };

  const closeClickHandle = () => {
    setOpen(false);
    setPost(undefined);
  };

  return (
    <Layout>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mx-auto max-w-screen-lg">
        {
          !!posts.length && posts.map(item => (
            <div
              onClick={() => openClickHandle(item)}
              key={item.id}
              className="cursor-pointer rounded-md hover:brightness-95 ring-2 dark:ring-primary-200">
              <Image
                quality={60}
                className="rounded-t-md"
                width={600}
                height={480}
                src={item?.thumbnail_url ?? noImage.src}
                alt={item.id}
                style={{ widows: '360px', height: '160px', objectFit: 'cover' }}
              />
              <div className="px-6 py-4 bg-white">
                <div className="font-bold text-xl mb-2">
                  <Caption overflow="elipsis" caption={item.caption_text}
                  />
                </div>
              </div>
              <div className="px-6 pt-4 pb-2 bg-white flex flex-wrap rounded-b-md">
                <span className={chips}>
                  <FavoriteBorderIcon />&nbsp;
                  {item.like_count}
                </span>
                <span className={chips}>
                  <ChatBubbleOutlineIcon />&nbsp;
                  {item.comment_count}
                </span>
              </div>
            </div>
          ))
        }
      </div>
      <Modal
        open={open}
        onClose={closeClickHandle}
        title={post?.caption_text || 'No caption provided'}
        body={post && (
          <div className="p-6 space-y-6 modal-grid md:modal-grid-lg">
            <Image
              quality={100}
              className="rounded-md"
              width={300}
              height={140}
              src={post?.thumbnail_url ?? noImage.src}
              alt={post.id}
            />
            <p className="text-base leading-relaxed text-gray-500">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        )}
      />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const token = await getToken({ req });
  const { sessionId, userId } = token ?? {};


  try {
    const posts = await getAllMedia(sessionId!, userId!);
    if (!Array.isArray(posts)) {
      console.log('REQUEST: ', posts);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return { props: { posts } };
  } catch (error) {
    signOut();
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}