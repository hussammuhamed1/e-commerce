
export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;  
}

export interface BrandApiResponse {
  results: number;
  metadata: BrandMetadata;
  data: IBrand[];
}
