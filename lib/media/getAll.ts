import { Post } from "../../types/Post";

const url = process.env.NEXT_API_URL;

export async function getAllMedia(sessionid: string, userId: string, amount = 50): Promise<Post[]> {
  const posts = await fetch(`${url}/media/user_medias`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `sessionid=${sessionid}&user_id=${userId}&amount=${amount}`
  });
  const result = await posts.json();

  return result;
}
