import { Post } from "../../types/Post";

const url = process.env.NEXT_API_URL;

export async function getByPk(sessionId: string, pk: string): Promise<Post[]> {
  const posts = await fetch(`${url}/media/user_medias`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `sessionid=${sessionId}&user_id=${pk}&use_cache=true`
  });

  return await posts.json();
}
