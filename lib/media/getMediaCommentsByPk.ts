import { Post } from "../../types/Post";

const url = process.env.NEXT_LAMADAVA_API_URL;

export async function getMediaCommentsByPk(pk: string): Promise<Post[]> {
  const posts = await fetch(`${url}/media/comments/chunk?id=${pk}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'x-access-key': 'DP2VIFxZ3X07RyhzuOKSC0Zj2qPnbVkm',
    },
  });

  return await posts.json();
}
