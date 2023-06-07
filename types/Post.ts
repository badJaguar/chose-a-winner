export interface PostData {
  data: Post[];
  paging: Paging;
}

export interface Post {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  caption?: string;
}

export interface Paging {
  cursors: Cursors;
}

export interface Cursors {
  before: string;
  after: string;
}
