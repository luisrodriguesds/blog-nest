export interface ICreatePostDTO {
  title: string;
  content: string;
  image?: string;
  user_id: string;
  status?: number;
}
