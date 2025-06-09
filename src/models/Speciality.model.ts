export interface Speciality {
  id?: number;
  name: string;
  discipline_id: number;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  discipline?: {
    id: number;
    name: string;
    description: string;
    image: string;
    created_at?: string;
    updated_at?: string;
  };
  courses?: Array<{
    id: number;
    name: string;
    speciality_id: number;
    creator_id: number;
    description: string;
    image: string;
    created_at?: string;
    updated_at?: string;
  }>;
}