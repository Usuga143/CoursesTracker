export type level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ICourse {
  id: number;
  name: string;
  category: string;
  level: level;
  active:boolean;
}