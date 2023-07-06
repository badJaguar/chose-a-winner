import { useState } from "react";
// import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Layout from "../components/layout";
// import { getAllMedia } from "../lib/media/getAll";
import { Post } from "../types/Post";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useSession } from "next-auth/react";
import Caption from "../components/caption";
import Modal from "../components/modal";
import noImage from '../public/images/no-img.png';
import ModalPost from "../components/modal-post";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";
import { Container, Typography } from "@mui/material";
// import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";

const chips = "text-sm md:text-lg inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2";

const posts = [
  {
    "pk": "3123422773439334111",
    "id": "3123422773439334111_60048238518",
    "code": "CtYoHa-N4bf",
    "taken_at": "2023-06-12T09:10:31+00:00",
    "media_type": 1,
    "product_type": "feed",
    "thumbnail_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/352949205_3577402715824154_8286023590805108810_n.webp?stp=dst-jpg_e35_p1080x1080&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=3ucEyiIb5WkAX-eexV2&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzEyMzQyMjc3MzQzOTMzNDExMQ%3D%3D.2-ccb7-5&oh=00_AfDM7qPLSdpOPJ-W-Rwj1RGvFZEu4MgG0a0qAZKJjBpjFg&oe=648CC7EA&_nc_sid=a1ad6c",
    "location": null,
    "user": {
      "pk": "60048238518",
      "username": "test_winner_generator",
      "full_name": "Alexander Ataakgayev",
      "profile_pic_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=aOzHF6zlp1kAX9ZCGYJ&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfBFHAlCK5dznTphTOm5MyC6kmwe2gU1mr3NqPBnJkMrjw&oe=648D359E&_nc_sid=a1ad6c",
      "profile_pic_url_hd": null,
      "is_private": false,
      "stories": []
    },
    "comment_count": 0,
    "like_count": 0,
    "has_liked": false,
    "caption_text": "",
    "usertags": [],
    "video_url": null,
    "view_count": 0,
    "video_duration": 0,
    "title": "",
    "resources": [],
    "clips_metadata": {}
  },
  {
    "pk": "3118583350880730220",
    "id": "3118583350880730220_60048238518",
    "code": "CtHbwjfsXxs",
    "taken_at": "2023-06-05T16:55:27+00:00",
    "media_type": 1,
    "product_type": "feed",
    "thumbnail_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/351285188_9887137361359195_5412227090917789745_n.webp?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=Sx6CVN1Y7mYAX_oo8z6&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzExODU4MzM1MDg4MDczMDIyMA%3D%3D.2-ccb7-5&oh=00_AfBt5crL6Qc_uY2YctvEOyTilGlcDYhW_KtkMXzvh9omDA&oe=648E1C76&_nc_sid=a1ad6c",
    "location": {
      "pk": 336061723604692,
      "name": "Минск Проспект Победителей",
      "phone": "",
      "website": "",
      "category": "",
      "hours": {},
      "address": null,
      "city": null,
      "zip": null,
      "lng": 27.509428460002,
      "lat": 53.930716100005,
      "external_id": 336061723604692,
      "external_id_source": "facebook_places"
    },
    "user": {
      "pk": "60048238518",
      "username": "test_winner_generator",
      "full_name": "Alexander Ataakgayev",
      "profile_pic_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=aOzHF6zlp1kAX9ZCGYJ&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfBFHAlCK5dznTphTOm5MyC6kmwe2gU1mr3NqPBnJkMrjw&oe=648D359E&_nc_sid=a1ad6c",
      "profile_pic_url_hd": null,
      "is_private": false,
      "stories": []
    },
    "comment_count": 1,
    "like_count": 0,
    "has_liked": false,
    "caption_text": "",
    "usertags": [],
    "video_url": null,
    "view_count": 0,
    "video_duration": 0,
    "title": "",
    "resources": [],
    "clips_metadata": {}
  },
  {
    "pk": "3118583043438237517",
    "id": "3118583043438237517_60048238518",
    "code": "CtHbsFKsVdN",
    "taken_at": "2023-06-05T16:54:50+00:00",
    "media_type": 1,
    "product_type": "feed",
    "thumbnail_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/351168116_602926628569456_7457549464898828565_n.webp?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=2rPQuYkbrywAX_FLTP_&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzExODU4MzA0MzQzODIzNzUxNw%3D%3D.2-ccb7-5&oh=00_AfD7-V5A8ASDLIkgRSO4SPNh_GTrGtnGH82USaoJGGPeOw&oe=648E2E67&_nc_sid=a1ad6c",
    "location": null,
    "user": {
      "pk": "60048238518",
      "username": "test_winner_generator",
      "full_name": "Alexander Ataakgayev",
      "profile_pic_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=aOzHF6zlp1kAX9ZCGYJ&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfBFHAlCK5dznTphTOm5MyC6kmwe2gU1mr3NqPBnJkMrjw&oe=648D359E&_nc_sid=a1ad6c",
      "profile_pic_url_hd": null,
      "is_private": false,
      "stories": []
    },
    "comment_count": 0,
    "like_count": 0,
    "has_liked": false,
    "caption_text": "",
    "usertags": [],
    "video_url": null,
    "view_count": 0,
    "video_duration": 0,
    "title": "",
    "resources": [],
    "clips_metadata": {}
  },
  {
    "pk": "3118582647336649553",
    "id": "3118582647336649553_60048238518",
    "code": "CtHbmURMsNR",
    "taken_at": "2023-06-05T16:54:03+00:00",
    "media_type": 1,
    "product_type": "feed",
    "thumbnail_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/351719769_954438725981396_5287766003816755764_n.webp?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=hACKJjUjj-YAX8HoopI&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzExODU4MjY0NzMzNjY0OTU1Mw%3D%3D.2-ccb7-5&oh=00_AfAeuY9pbl7AMUiItRokr3CdCbL6pDnAQ9sBtKGxKPZmGw&oe=648DDA90&_nc_sid=a1ad6c",
    "location": null,
    "user": {
      "pk": "60048238518",
      "username": "test_winner_generator",
      "full_name": "Alexander Ataakgayev",
      "profile_pic_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=aOzHF6zlp1kAX9ZCGYJ&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfBFHAlCK5dznTphTOm5MyC6kmwe2gU1mr3NqPBnJkMrjw&oe=648D359E&_nc_sid=a1ad6c",
      "profile_pic_url_hd": null,
      "is_private": false,
      "stories": []
    },
    "comment_count": 0,
    "like_count": 0,
    "has_liked": false,
    "caption_text": "",
    "usertags": [],
    "video_url": null,
    "view_count": 0,
    "video_duration": 0,
    "title": "",
    "resources": [],
    "clips_metadata": {}
  },
  {
    "pk": "3118535815634010470",
    "id": "3118535815634010470_60048238518",
    "code": "CtHQ802MsFm",
    "taken_at": "2023-06-05T15:21:00+00:00",
    "media_type": 1,
    "product_type": "feed",
    "thumbnail_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/351433438_178428328223676_8744204808834217187_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=tGoQtcu41ikAX-Q4q9H&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzExODUzNTgxNTYzNDAxMDQ3MA%3D%3D.2-ccb7-5&oh=00_AfAIm55MmzmHTgN7S-AzpTOp5MbsMOHwFYG1631mSb4rCQ&oe=648CD92F&_nc_sid=a1ad6c",
    "location": null,
    "user": {
      "pk": "60048238518",
      "username": "test_winner_generator",
      "full_name": "Alexander Ataakgayev",
      "profile_pic_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=aOzHF6zlp1kAX9ZCGYJ&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfBFHAlCK5dznTphTOm5MyC6kmwe2gU1mr3NqPBnJkMrjw&oe=648D359E&_nc_sid=a1ad6c",
      "profile_pic_url_hd": null,
      "is_private": false,
      "stories": []
    },
    "comment_count": 0,
    "like_count": 0,
    "has_liked": false,
    "caption_text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "usertags": [],
    "video_url": null,
    "view_count": 0,
    "video_duration": 0,
    "title": "",
    "resources": [],
    "clips_metadata": {}
  },
  {
    "pk": "3118524599570119752",
    "id": "3118524599570119752_60048238518",
    "code": "CtHOZnEsbxI",
    "taken_at": "2023-06-05T14:58:43+00:00",
    "media_type": 1,
    "product_type": "feed",
    "thumbnail_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/351429435_271433648697242_220537978748423291_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=10gPl3I8iyEAX_yIia-&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzExODUyNDU5OTU3MDExOTc1Mg%3D%3D.2-ccb7-5&oh=00_AfAZ8zEbydveH4ZN-fEB35XAmBizILWFNiP5S_dkfyq5rQ&oe=648C8A90&_nc_sid=a1ad6c",
    "location": null,
    "user": {
      "pk": "60048238518",
      "username": "test_winner_generator",
      "full_name": "Alexander Ataakgayev",
      "profile_pic_url": "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=aOzHF6zlp1kAX9ZCGYJ&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfBFHAlCK5dznTphTOm5MyC6kmwe2gU1mr3NqPBnJkMrjw&oe=648D359E&_nc_sid=a1ad6c",
      "profile_pic_url_hd": null,
      "is_private": false,
      "stories": []
    },
    "comment_count": 5,
    "like_count": 3,
    "has_liked": true,
    "caption_text": "Test caption @Lizaonair",
    "usertags": [],
    "video_url": null,
    "view_count": 0,
    "video_duration": 0,
    "title": "",
    "resources": [],
    "clips_metadata": {}
  }
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  // TODO: Change to true
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post | undefined>();

  const { data: session } = useSession();
  const [content, setContent] = useState<Post[]>(posts as Post[]);
  console.log(setLoading, setContent);

  // // Fetch content from protected route
  // useIsomorphicLayoutEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/examples/posts");
  //     const json = await res.json();
  //     setLoading(false);
  //     if (json) {
  //       setContent(json);
  //     }
  //   };
  //   fetchData();
  // }, [session]);


  const openClickHandle = (item: Post) => {
    setOpen(true);
    setPost(item);
  };

  const closeClickHandle = () => {
    setOpen(false);
    setPost(undefined);
  };


  // if (loading) {
  //   return (
  //     <Layout>
  //       <Typography variant="h2" component="h2">Wait!</Typography>
  //     </Layout>
  //   );
  // }

  if (!session && !loading) {
    return (
      <Layout>
        <Typography variant="h2" component="h2">Please login!</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" className="grid grid-cols-2 lg:grid-cols-3 gap-2 ">
        {
          !!content.length && content.map(item => (
            <div
              onClick={() => openClickHandle(item as Post)}
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
