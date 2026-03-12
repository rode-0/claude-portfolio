export interface Capability {
  id: string;
  title: string;
  slug: string;
  description: string;
  category:
    | 'code-generation'
    | 'multi-agent'
    | 'tdd'
    | 'security'
    | 'api-design'
    | 'database'
    | 'devops';
  icon: string;
  features: string[];
  codeExample: string;
  codeLanguage: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  capabilityId: string;
  featured: boolean;
}

export const categoryIcons: Record<Capability['category'], string> = {
  'code-generation': '\u26A1',
  'multi-agent': '\uD83E\uDD16',
  tdd: '\u2705',
  security: '\uD83D\uDEE1\uFE0F',
  'api-design': '\uD83D\uDD17',
  database: '\uD83D\uDDC4\uFE0F',
  devops: '\uD83D\uDC33',
};
