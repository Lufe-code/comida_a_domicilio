export interface PhotoData {
  image_url: string;
  caption?: string;
  issue_id: number;
  taken_at?: string | null;
}

export interface PhotoResponse extends PhotoData {
  id: number;
  created_at: string;
}