export interface Course {
  id?: number;
  name: string;
  cours_url?: string;
  speciality_id: number;
  creator_id: number;
  description: string;
  image: string;
  is_accepted?: boolean;
  created_at?: string;
  updated_at?: string;
  speciality?: {
    id: number;
    name: string;
    discipline_id: number;
    description: string;
    image: string;
    created_at?: string;
    updated_at?: string;
  };
  exam?: Exam | null;
  creator?: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
    email_verified_at?: string;
    is_active: number;
    created_at?: string;
    updated_at?: string;
  };
}

export interface Exam {
  id?: number;
  description: string;
  cours_id: number;
  created_at?: string;
  updated_at?: string;
  questions?: Question[];
  course?: Course;
}

export interface Question {
  id?: number;
  exams_id: number;
  question: string;
  type: 'unique_choice' | 'multiple_choice';
  created_at?: string;
  updated_at?: string;
  answers?: Answer[];
}

export interface Answer {
  id?: number;
  question_id: number;
  answer: string;
  is_correct: boolean;
  created_at?: string;
  updated_at?: string;
}