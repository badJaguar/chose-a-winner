export interface CommentUser {
  pk: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
  profile_pic_url_hd: string | null;
  is_private: boolean;
  is_verified: boolean;
  stories: any; // You can replace 'any' with the appropriate type if available
}

export interface Comment {
  pk: string;
  text: string;
  user: CommentUser;
  created_at_utc: string;
  content_type: string;
  status: string;
  has_liked: boolean;
  like_count: number;
}
