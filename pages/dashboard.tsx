import { useState } from "react";
import { GetServerSidePropsContext } from "next";
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
import ModalPost from "../components/modal-post";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Container } from "@mui/material";

const chips = "text-sm md:text-lg inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2";

interface MePageProps {
  posts: Post[];
}

export default function Dashboard(props: MePageProps) {
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
      <Container maxWidth="md" className="grid grid-cols-2 lg:grid-cols-3 gap-2 ">
        {
          !!posts.length && posts.map(item => (
            <div
              onClick={() => openClickHandle(item)}
              key={item.id}
              className="cursor-pointer rounded-md hover:brightness-95 ring-2 dark:ring-primary-200 bg-white">
              <Image
                quality={60}
                className="h-48 md:h-[280px] rounded-t-md"
                width={600}
                height={480}
                src={item?.thumbnail_url ?? noImage.src}
                alt={item.id}
                style={{ objectFit: 'cover' }}
              />
              <div className="">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    <Caption overflow="elipsis" caption={item.caption_text}
                    />
                  </div>
                </div>
                <div className="px-3 md:px-6 pt-4 pb-2 flex flex-wrap rounded-b-md">
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
            </div>
          ))
        }
      </Container>
      <Modal
        open={open}
        onClose={closeClickHandle}
        title={post?.caption_text || 'No caption provided'}
        body={post && <ModalPost post={post} onClose={closeClickHandle} />}
      />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { sessionId, userId } = session ?? {};

  try {
    const posts = await getAllMedia(sessionId!, userId!);

    if (!Array.isArray(posts)) {
      console.log('REQUEST: ', posts);
      //TODO: Fix error hanling
      // REQUEST:  {
      //   detail: 'Please wait a few minutes before you try again.',
      //   exc_type: 'ClientError'
      // }
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
