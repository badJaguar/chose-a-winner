export interface Post {
  pk: string;
  id: string;
  code: string;
  taken_at: string;
  media_type: number;
  product_type: string;
  thumbnail_url: string;
  location?: Location;
  user: User;
  comment_count: number;
  like_count: number;
  has_liked: boolean;
  caption_text: string;
  usertags: any[];
  video_url: any;
  view_count: number;
  video_duration: number;
  title: string;
  resources: any[];
  clips_metadata: ClipsMetadata;
}

export interface Location {
  pk: number;
  name: string;
  phone: string;
  website: string;
  category: string;
  hours: Hours;
  address: any;
  city: any;
  zip: any;
  lng: number;
  lat: number;
  external_id: number;
  external_id_source: string;
}

export interface Hours { }

export interface User {
  pk: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
  profile_pic_url_hd: any;
  is_private: boolean;
  stories: any[];
}

export interface ClipsMetadata { }
