
export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  techDetails: string[];
  backend: string[];
  ai: string[];
  architectureImageUrl: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}
