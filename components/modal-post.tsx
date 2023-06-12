import { useState } from 'react';
import Image from "next/image";
import useSWR from 'swr';
import { Post, User } from "../types/Post";
import noImage from '../public/images/no-img.png';
import { Comment, CommentUser } from "../types/Comment";
import Caption from "./caption";

function filterUniqueComments(comments: Comment[]): Comment[] {
  const uniqueUsers: CommentUser[] = [];
  const uniqueComments: Comment[] = [];

  for (const comment of comments) {
    if (!uniqueUsers.some(user => user.username === comment.user.username)) {
      uniqueUsers.push(comment.user);
      uniqueComments.push(comment);
    }
  }

  return uniqueComments;
}

const url = process.env.NEXT_LAMADAVA_API_URL;

const opts = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'x-access-key': 'DP2VIFxZ3X07RyhzuOKSC0Zj2qPnbVkm',
  },
};

const fetcher = (apiURL: string) => fetch(apiURL, opts).then(res => res.json());

const comments: Comment[][] = [
  [
    {
      "pk": "18011623048710729",
      "text": "test_winner_generator",
      "user": {
        "pk": "57560135083",
        "username": "petkevich_stroy",
        "full_name": "Строительство домов|ремонт|отделка стен|укладка плитки",
        "profile_pic_url": "https://scontent-hou1-1.cdninstagram.com/v/t51.2885-19/328270913_1860740097630111_2535643601564378967_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hou1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=pfjTpY2jG0YAX86e0Cw&edm=AId3EpQBAAAA&ccb=7-5&oh=00_AfDP5ibunyUdPZFlXjM8yBYKS0nA8-d9TVRgWiePgTEt2A&oe=648C32F7&_nc_sid=fb4ee2",
        "profile_pic_url_hd": null,
        "is_private": false,
        "is_verified": false,
        "stories": null
      },
      "created_at_utc": "2023-06-12T12:25:42+00:00",
      "content_type": "comment",
      "status": "Active",
      "has_liked": false,
      "like_count": 0
    },
    {
      "pk": "17993000497982676",
      "text": "Test test",
      "user": {
        "pk": "1571167792",
        "username": "_im_fabi_",
        "full_name": "Anastasiya",
        "profile_pic_url": "https://scontent-hou1-1.cdninstagram.com/v/t51.2885-19/307852570_494330512207901_4283287669192377931_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hou1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=JnS7t--moL0AX99DEFR&edm=AId3EpQBAAAA&ccb=7-5&oh=00_AfDojvsgcr_0OXarGjMJW3eVhaT0DIEoz2saQF2V7FEPMg&oe=648BECA4&_nc_sid=fb4ee2",
        "profile_pic_url_hd": null,
        "is_private": false,
        "is_verified": false,
        "stories": null
      },
      "created_at_utc": "2023-06-12T12:22:31+00:00",
      "content_type": "comment",
      "status": "Active",
      "has_liked": false,
      "like_count": 0
    },
    {
      "pk": "18067799866380430",
      "text": "You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:grid-cols-6 to apply the grid-cols-6 utility at only medium screen sizes and above. @_im_fabi_  test",
      "user": {
        "pk": "60048238518",
        "username": "test_winner_generator",
        "full_name": "Alexander Ataakgayev",
        "profile_pic_url": "https://scontent-hou1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hou1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=ASPyLs6sglkAX-VhqEW&edm=AId3EpQBAAAA&ccb=7-5&oh=00_AfCdR1bWOiH9CJptMdqa81Hbdy9yffpuS7C2UV-wG4pPng&oe=648B3B5E&_nc_sid=fb4ee2",
        "profile_pic_url_hd": null,
        "is_private": false,
        "is_verified": false,
        "stories": null
      },
      "created_at_utc": "2023-06-12T11:02:35+00:00",
      "content_type": "comment",
      "status": "Active",
      "has_liked": false,
      "like_count": 1
    },
    {
      "pk": "17978986064202804",
      "text": "@Lizaonar",
      "user": {
        "pk": "60048238518",
        "username": "test_winner_generator",
        "full_name": "Alexander Ataakgayev",
        "profile_pic_url": "https://scontent-hou1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hou1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=ASPyLs6sglkAX-VhqEW&edm=AId3EpQBAAAA&ccb=7-5&oh=00_AfCdR1bWOiH9CJptMdqa81Hbdy9yffpuS7C2UV-wG4pPng&oe=648B3B5E&_nc_sid=fb4ee2",
        "profile_pic_url_hd": null,
        "is_private": false,
        "is_verified": false,
        "stories": null
      },
      "created_at_utc": "2023-06-05T15:44:11+00:00",
      "content_type": "comment",
      "status": "Active",
      "has_liked": false,
      "like_count": 0
    },
    {
      "pk": "18366210472058939",
      "text": "test comment",
      "user": {
        "pk": "60048238518",
        "username": "test_winner_generator",
        "full_name": "Alexander Ataakgayev",
        "profile_pic_url": "https://scontent-hou1-1.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hou1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=ASPyLs6sglkAX-VhqEW&edm=AId3EpQBAAAA&ccb=7-5&oh=00_AfCdR1bWOiH9CJptMdqa81Hbdy9yffpuS7C2UV-wG4pPng&oe=648B3B5E&_nc_sid=fb4ee2",
        "profile_pic_url_hd": null,
        "is_private": false,
        "is_verified": false,
        "stories": null
      },
      "created_at_utc": "2023-06-05T15:00:43+00:00",
      "content_type": "comment",
      "status": "Active",
      "has_liked": false,
      "like_count": 0
    }
  ],
];

const likers: User[] = [
  {
    "pk": "57560135083",
    "username": "petkevich_stroy",
    "full_name": "Строительство домов|ремонт|отделка стен|укладка плитки",
    "profile_pic_url": "https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/328270913_1860740097630111_2535643601564378967_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=pfjTpY2jG0YAX_XdmbI&edm=APwHDrQBAAAA&ccb=7-5&oh=00_AfBUvTpCWg325g8190WSLDDmA5QObex2_rDdkl2apRq71Q&oe=648C32F7&_nc_sid=687400",
    "is_private": false,
    "is_verified": false
  },
  {
    "pk": "60048238518",
    "username": "test_winner_generator",
    "full_name": "Alexander Ataakgayev",
    "profile_pic_url": "https://scontent-lga3-2.cdninstagram.com/v/t51.2885-19/351372613_211724935027197_5147074641586896797_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=109&_nc_ohc=ASPyLs6sglkAX8iRzmC&edm=APwHDrQBAAAA&ccb=7-5&oh=00_AfCqdQMF4z44L6od4CH-Cn1PNuazyE8x2QY1HzQG2srs2A&oe=648B3B5E&_nc_sid=687400",
    "is_private": false,
    "is_verified": false
  },
  {
    "pk": "1571167792",
    "username": "_im_fabi_",
    "full_name": "Anastasiya",
    "profile_pic_url": "https://scontent-lga3-2.cdninstagram.com/v/t51.2885-19/307852570_494330512207901_4283287669192377931_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=105&_nc_ohc=JnS7t--moL0AX-yFeFA&edm=APwHDrQBAAAA&ccb=7-5&oh=00_AfA6bK7SbblEW_w8puvVJWv0Qk-Q2KJzXneIwwkKZjfjcQ&oe=648BECA4&_nc_sid=687400",
    "is_private": false,
    "is_verified": false
  }
];

const ModalPost = ({ post, onClose }: { post: Post; onClose: VoidFunction; }) => {
  const { id, pk, thumbnail_url } = post ?? {};

  const [winner, setWinner] = useState<CommentUser | null>(null);

  // const { data: comments, isLoading: commentsLoading } = useSWR<Comment[][]>(`${url}/media/comments/chunk?id=${pk}`, fetcher);
  // const { data: likers, isLoading: likersLoading } = useSWR<User[]>(`${url}/media/likers?id=${pk}`, fetcher);
  const filteredComments = comments?.flat().filter((value) => value);
  const likersFilter = likers;

  function getRandomUser(inputComments: Comment[]): CommentUser | null {
    if (inputComments.length === 0) return null;

    const comments = filterUniqueComments(inputComments);

    const randomIndex = Math.floor(Math.random() * comments.length);
    const randomComment = comments[randomIndex];

    // IS_LIKED index.
    const likerIndex = likersFilter.findIndex(liker => liker.username === randomComment.user.username);
    if (likerIndex === -1) {
      comments.splice(randomIndex, 1);
      return getRandomUser(comments);
    }

    return comments[likerIndex].user;
  }

  const selectWinnerHandle = () => {
    setWinner(getRandomUser(filteredComments));
  };


  // if (isLoading || !filteredComments) {
  //   return (<div role="status">
  //     <svg aria-hidden="true" className="inline w-30 h-30 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
  //       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
  //     </svg>
  //     <span className="sr-only">Loading...</span>
  //   </div>);
  // }

  return (
    <div className="p-6 space-y-6 modal-grid md:modal-grid-lg">
      <Image
        quality={100}
        className="rounded-md"
        width={300}
        height={600}
        src={thumbnail_url ?? noImage.src}
        alt={id}
      />
      <div className="overflow-auto max-h-60 divide-y">
        {
          filteredComments && filteredComments.map(comment => (
            <div key={comment.pk} className="grid comment-grid-layout px-4 py-4 first:pt-0">
              <Image
                quality={10}
                className="w-16 h-16 rounded-full"
                width={30}
                height={30}
                src={thumbnail_url ?? noImage.src}
                alt={comment.user.username}

              />
              <div >
                <p className="font-semibold text-lg">{comment.user.username}</p>
                <Caption overflow="none" caption={comment.text} />
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex items-center winner-action p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          type="button"
          className="ripple text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={selectWinnerHandle}
        >Select a Winner</button>
        <button onClick={onClose} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
        <p>{winner?.username}</p>
      </div>
    </div>
  );
};

export default ModalPost;