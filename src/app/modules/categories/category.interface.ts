export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  imageUrl: string[];
  description?: string;
  isDeleted?: boolean;
}
