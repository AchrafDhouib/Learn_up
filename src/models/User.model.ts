export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  is_active: number;
  roles: string;
  created_at?: string;
  updated_at?: string;
}