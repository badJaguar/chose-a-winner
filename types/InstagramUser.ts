export interface InstagramUser {
  pk: string;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_url_hd: any;
  is_verified: boolean;
  media_count: number;
  follower_count: number;
  following_count: number;
  biography: string;
  external_url: string | null;
  is_business: boolean;
  public_email: string;
  contact_phone_number: string;
  business_contact_method: string;
  business_category_name: string | null;
  category_name: string | null;
}
