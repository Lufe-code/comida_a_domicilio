export interface IssuePhoto {
  id: number;
  image_url: string;
  caption?: string;
  created_at: string;
  issue_id: number;
  taken_at?: string | null;
}

export interface IssueData {
  description: string;
  issue_type: string;
  date_reported: string;
  status: string;
  motorcycle_id: number;
}

export interface IssueResponse extends IssueData {
  id: number;
  created_at: string;
  photos: IssuePhoto[];
}