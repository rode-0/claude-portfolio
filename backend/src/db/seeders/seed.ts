import dotenv from 'dotenv';
dotenv.config();

import { sequelize, Capability, Project } from '../models';
import { CapabilityCategory } from '../models/Capability';

const capabilities = [
  {
    title: 'Code Generation',
    slug: 'code-generation',
    description:
      'Claude generates production-ready code across languages and frameworks. From React components to backend services, Claude produces clean, idiomatic code with proper typing, error handling, and best practices baked in. It understands project context, follows existing patterns, and generates code that integrates seamlessly with your codebase.',
    category: CapabilityCategory.CODE_GENERATION,
    icon: 'Code',
    features: [
      'Full-stack component generation with TypeScript',
      'Automatic import resolution and dependency management',
      'Context-aware code that follows existing project patterns',
      'Inline documentation and JSDoc annotations',
      'Framework-specific best practices (React hooks, Express middleware, etc.)',
      'Generates tests alongside implementation code',
    ],
    codeExample: `import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'viewer';
}

interface UserCardProps {
  userId: string;
  onEdit?: (user: User) => void;
  compact?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ userId, onEdit, compact = false }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    return () => controller.abort();
  }, [userId]);

  if (loading) return <div className="animate-pulse h-24 bg-gray-200 rounded-lg" />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!user) return null;

  return (
    <div className={\`rounded-lg shadow-md p-\${compact ? 3 : 6} bg-white\`}>
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className={\`rounded-full \${compact ? 'w-10 h-10' : 'w-16 h-16'}\`}
        />
        <div>
          <h3 className="font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
            {user.role}
          </span>
        </div>
      </div>
      {onEdit && (
        <button
          onClick={() => onEdit(user)}
          className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default UserCard;`,
    codeLanguage: 'tsx',
    order: 1,
  },
  {
    title: 'Multi-Agent Orchestration',
    slug: 'multi-agent',
    description:
      'Claude powers sophisticated multi-agent systems with up to 18 specialized agents working in concert. Inspired by the everything-claude-code architecture, this capability demonstrates orchestration of planning agents, coding agents, testing agents, review agents, and deployment agents -- all coordinated through a central orchestrator that manages task decomposition, parallel execution, and result aggregation.',
    category: CapabilityCategory.MULTI_AGENT,
    icon: 'Network',
    features: [
      'Orchestrator pattern with 18 specialized sub-agents',
      'Automatic task decomposition and parallel execution',
      'Inter-agent communication via structured message passing',
      'Conflict resolution when agents produce contradictory outputs',
      'Progress tracking and real-time status reporting',
      'Graceful degradation when individual agents fail',
      'Context window management across agent boundaries',
    ],
    codeExample: `// Multi-Agent Orchestration Configuration
// Based on everything-claude-code architecture

interface AgentConfig {
  name: string;
  role: string;
  capabilities: string[];
  maxConcurrency: number;
  timeout: number;
}

interface OrchestrationPlan {
  phases: Phase[];
  rollbackStrategy: 'sequential' | 'parallel';
}

interface Phase {
  name: string;
  agents: string[];
  parallel: boolean;
  dependsOn?: string[];
}

const agents: AgentConfig[] = [
  {
    name: 'planner',
    role: 'Decomposes high-level tasks into executable steps',
    capabilities: ['task-analysis', 'dependency-graph', 'estimation'],
    maxConcurrency: 1,
    timeout: 30000,
  },
  {
    name: 'architect',
    role: 'Designs system architecture and data models',
    capabilities: ['schema-design', 'api-contract', 'system-diagram'],
    maxConcurrency: 1,
    timeout: 45000,
  },
  {
    name: 'frontend-coder',
    role: 'Implements React/TypeScript UI components',
    capabilities: ['react', 'typescript', 'css', 'accessibility'],
    maxConcurrency: 3,
    timeout: 60000,
  },
  {
    name: 'backend-coder',
    role: 'Implements server-side logic and APIs',
    capabilities: ['node', 'express', 'database', 'auth'],
    maxConcurrency: 3,
    timeout: 60000,
  },
  {
    name: 'test-writer',
    role: 'Writes unit, integration, and e2e tests',
    capabilities: ['jest', 'playwright', 'coverage-analysis'],
    maxConcurrency: 4,
    timeout: 45000,
  },
  {
    name: 'security-reviewer',
    role: 'Scans for vulnerabilities and enforces policies',
    capabilities: ['sast', 'dependency-audit', 'owasp-check'],
    maxConcurrency: 2,
    timeout: 30000,
  },
  {
    name: 'devops-agent',
    role: 'Manages CI/CD pipelines and infrastructure',
    capabilities: ['docker', 'github-actions', 'terraform'],
    maxConcurrency: 1,
    timeout: 90000,
  },
  {
    name: 'docs-writer',
    role: 'Generates API docs, READMEs, and changelogs',
    capabilities: ['openapi', 'markdown', 'jsdoc'],
    maxConcurrency: 2,
    timeout: 30000,
  },
];

const orchestrationPlan: OrchestrationPlan = {
  phases: [
    { name: 'planning', agents: ['planner', 'architect'], parallel: false },
    { name: 'implementation', agents: ['frontend-coder', 'backend-coder'], parallel: true, dependsOn: ['planning'] },
    { name: 'quality', agents: ['test-writer', 'security-reviewer'], parallel: true, dependsOn: ['implementation'] },
    { name: 'delivery', agents: ['devops-agent', 'docs-writer'], parallel: true, dependsOn: ['quality'] },
  ],
  rollbackStrategy: 'sequential',
};

export { agents, orchestrationPlan };`,
    codeLanguage: 'typescript',
    order: 2,
  },
  {
    title: 'Test-Driven Development',
    slug: 'tdd',
    description:
      'Claude follows rigorous TDD workflows requiring 80%+ code coverage before considering a feature complete. It writes failing tests first, implements the minimal code to pass, then refactors. Claude generates comprehensive test suites covering unit tests, integration tests, edge cases, error paths, and boundary conditions -- ensuring rock-solid code from the start.',
    category: CapabilityCategory.TDD,
    icon: 'TestTube',
    features: [
      'Red-green-refactor cycle enforcement',
      '80%+ code coverage requirement before feature completion',
      'Automatic edge case and boundary condition generation',
      'Integration test scaffolding with database fixtures',
      'Mock and stub generation for external dependencies',
      'Mutation testing to verify test quality',
      'Coverage report generation and trend tracking',
    ],
    codeExample: `// TDD Workflow: Test-First Approach
// Step 1: Write the failing test

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartService } from '../services/CartService';
import { ProductRepository } from '../repositories/ProductRepository';
import { Cart, CartItem } from '../models/Cart';

describe('CartService', () => {
  let cartService: CartService;
  let mockProductRepo: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockProductRepo = {
      findById: jest.fn(),
      checkStock: jest.fn(),
    } as unknown as jest.Mocked<ProductRepository>;
    cartService = new CartService(mockProductRepo);
  });

  describe('addItem', () => {
    it('should add a new item to an empty cart', async () => {
      mockProductRepo.findById.mockResolvedValue({
        id: 'prod-1',
        name: 'Widget',
        price: 29.99,
      });
      mockProductRepo.checkStock.mockResolvedValue(10);

      const cart = new Cart();
      const updatedCart = await cartService.addItem(cart, 'prod-1', 2);

      expect(updatedCart.items).toHaveLength(1);
      expect(updatedCart.items[0]).toEqual<CartItem>({
        productId: 'prod-1',
        name: 'Widget',
        price: 29.99,
        quantity: 2,
      });
      expect(updatedCart.total).toBe(59.98);
    });

    it('should increment quantity if item already exists', async () => {
      mockProductRepo.findById.mockResolvedValue({
        id: 'prod-1',
        name: 'Widget',
        price: 29.99,
      });
      mockProductRepo.checkStock.mockResolvedValue(10);

      const cart = new Cart();
      cart.items = [{ productId: 'prod-1', name: 'Widget', price: 29.99, quantity: 1 }];

      const updatedCart = await cartService.addItem(cart, 'prod-1', 3);

      expect(updatedCart.items).toHaveLength(1);
      expect(updatedCart.items[0].quantity).toBe(4);
      expect(updatedCart.total).toBe(119.96);
    });

    it('should throw if product not found', async () => {
      mockProductRepo.findById.mockResolvedValue(null);

      const cart = new Cart();

      await expect(cartService.addItem(cart, 'invalid', 1)).rejects.toThrow(
        'Product not found: invalid'
      );
    });

    it('should throw if requested quantity exceeds stock', async () => {
      mockProductRepo.findById.mockResolvedValue({
        id: 'prod-1',
        name: 'Widget',
        price: 29.99,
      });
      mockProductRepo.checkStock.mockResolvedValue(2);

      const cart = new Cart();

      await expect(cartService.addItem(cart, 'prod-1', 5)).rejects.toThrow(
        'Insufficient stock for Widget: requested 5, available 2'
      );
    });

    it('should handle floating point precision in totals', async () => {
      mockProductRepo.findById.mockResolvedValue({
        id: 'prod-2',
        name: 'Gadget',
        price: 0.1,
      });
      mockProductRepo.checkStock.mockResolvedValue(100);

      const cart = new Cart();
      const updatedCart = await cartService.addItem(cart, 'prod-2', 3);

      // 0.1 + 0.1 + 0.1 should equal 0.30, not 0.30000000000000004
      expect(updatedCart.total).toBe(0.30);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', () => {
      const cart = new Cart();
      cart.items = [{ productId: 'prod-1', name: 'Widget', price: 29.99, quantity: 2 }];

      const updatedCart = cartService.removeItem(cart, 'prod-1');

      expect(updatedCart.items).toHaveLength(0);
      expect(updatedCart.total).toBe(0);
    });

    it('should not modify cart if item does not exist', () => {
      const cart = new Cart();
      cart.items = [{ productId: 'prod-1', name: 'Widget', price: 29.99, quantity: 2 }];

      const updatedCart = cartService.removeItem(cart, 'prod-999');

      expect(updatedCart.items).toHaveLength(1);
      expect(updatedCart.total).toBe(59.98);
    });
  });
});`,
    codeLanguage: 'typescript',
    order: 3,
  },
  {
    title: 'Security Review & AgentShield',
    slug: 'security',
    description:
      'Claude performs comprehensive security reviews using the AgentShield methodology. It scans for OWASP Top 10 vulnerabilities, identifies insecure dependencies, detects secrets in code, validates input sanitization, reviews authentication flows, and checks for common misconfigurations. Every pull request goes through automated security gates before merge.',
    category: CapabilityCategory.SECURITY,
    icon: 'Shield',
    features: [
      'OWASP Top 10 vulnerability detection',
      'Dependency vulnerability scanning with CVE lookup',
      'Secrets detection (API keys, tokens, passwords in code)',
      'SQL injection and XSS prevention validation',
      'Authentication and authorization flow review',
      'CORS and CSP misconfiguration detection',
      'Automated security gate in CI/CD pipeline',
      'Compliance checking (SOC2, HIPAA patterns)',
    ],
    codeExample: `// Security Review: AgentShield Vulnerability Scanner
// Automated security analysis for every pull request

interface SecurityFinding {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  file: string;
  line: number;
  message: string;
  recommendation: string;
  cwe?: string;
}

interface SecurityReport {
  passed: boolean;
  score: number;
  findings: SecurityFinding[];
  summary: Record<string, number>;
}

function analyzeEndpoint(code: string, filePath: string): SecurityFinding[] {
  const findings: SecurityFinding[] = [];

  // Check for SQL injection vulnerabilities
  const sqlInjectionPattern = /query\\(\\s*[\`'"]\s*SELECT.*\\$\\{/g;
  let match;
  while ((match = sqlInjectionPattern.exec(code)) !== null) {
    findings.push({
      severity: 'critical',
      category: 'SQL Injection',
      file: filePath,
      line: code.substring(0, match.index).split('\\n').length,
      message: 'String interpolation detected in SQL query. Use parameterized queries.',
      recommendation: 'Replace template literals with parameterized queries: query("SELECT * FROM users WHERE id = $1", [userId])',
      cwe: 'CWE-89',
    });
  }

  // Check for missing input validation
  const routePattern = /router\\.(get|post|put|delete)\\([^)]+,\\s*async/g;
  while ((match = routePattern.exec(code)) !== null) {
    const routeBlock = code.substring(match.index, match.index + 500);
    if (!routeBlock.includes('validate') && !routeBlock.includes('schema') && !routeBlock.includes('sanitize')) {
      findings.push({
        severity: 'medium',
        category: 'Input Validation',
        file: filePath,
        line: code.substring(0, match.index).split('\\n').length,
        message: 'API route handler lacks input validation middleware.',
        recommendation: 'Add validation middleware using zod, joi, or express-validator before the handler.',
        cwe: 'CWE-20',
      });
    }
  }

  // Check for missing rate limiting
  if (code.includes('router.post') && !code.includes('rateLimit')) {
    findings.push({
      severity: 'medium',
      category: 'Rate Limiting',
      file: filePath,
      line: 1,
      message: 'POST endpoints detected without rate limiting.',
      recommendation: 'Add express-rate-limit middleware to prevent brute force and DoS attacks.',
      cwe: 'CWE-770',
    });
  }

  // Check for hardcoded secrets
  const secretPatterns = [
    { pattern: /(?:api[_-]?key|apikey)\s*[:=]\s*['"][A-Za-z0-9]{20,}['"]/gi, name: 'API Key' },
    { pattern: /(?:password|passwd|pwd)\s*[:=]\s*['"][^'"]+['"]/gi, name: 'Password' },
    { pattern: /(?:secret|token)\s*[:=]\s*['"][A-Za-z0-9+/=]{20,}['"]/gi, name: 'Secret/Token' },
  ];

  for (const { pattern, name } of secretPatterns) {
    while ((match = pattern.exec(code)) !== null) {
      findings.push({
        severity: 'critical',
        category: 'Hardcoded Secret',
        file: filePath,
        line: code.substring(0, match.index).split('\\n').length,
        message: \`Potential hardcoded \${name} detected.\`,
        recommendation: 'Move secrets to environment variables and use a secrets manager in production.',
        cwe: 'CWE-798',
      });
    }
  }

  return findings;
}

function generateReport(findings: SecurityFinding[]): SecurityReport {
  const summary = findings.reduce((acc, f) => {
    acc[f.severity] = (acc[f.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const passed = !summary['critical'] && (summary['high'] || 0) === 0;
  const score = Math.max(0, 100 - (summary['critical'] || 0) * 25 - (summary['high'] || 0) * 15 - (summary['medium'] || 0) * 5 - (summary['low'] || 0) * 1);

  return { passed, score, findings, summary };
}

export { analyzeEndpoint, generateReport, SecurityFinding, SecurityReport };`,
    codeLanguage: 'typescript',
    order: 4,
  },
  {
    title: 'API Design',
    slug: 'api-design',
    description:
      'Claude designs and implements RESTful APIs following industry best practices. It generates consistent endpoint structures with proper HTTP methods, status codes, pagination, filtering, error responses, and versioning. Claude also produces OpenAPI/Swagger documentation alongside the implementation, keeping specs and code in sync.',
    category: CapabilityCategory.API_DESIGN,
    icon: 'Globe',
    features: [
      'RESTful resource modeling with proper URI design',
      'Consistent JSON response envelopes with pagination metadata',
      'Query parameter filtering, sorting, and field selection',
      'Proper HTTP status codes and error response format',
      'Request validation with schema-first approach',
      'OpenAPI 3.0 specification generation',
      'API versioning strategy (URL path or header)',
      'HATEOAS links for resource discoverability',
    ],
    codeExample: `// RESTful API Design: Resource Controller with Best Practices
import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Request validation schemas
const CreateArticleSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  tags: z.array(z.string()).max(10).optional(),
  published: z.boolean().optional().default(false),
});

const ListArticlesQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['createdAt', 'title', 'views']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  tag: z.string().optional(),
  published: z.coerce.boolean().optional(),
});

// Standard response envelope
interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  links?: {
    self: string;
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
}

interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

const router = Router();

// GET /api/v1/articles - List with pagination, filtering, sorting
router.get('/', async (req: Request, res: Response<ApiResponse<Article[]>>, next: NextFunction) => {
  try {
    const query = ListArticlesQuery.parse(req.query);
    const { page, limit, sort, order, tag, published } = query;
    const offset = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (tag) where.tags = { contains: [tag] };
    if (published !== undefined) where.published = published;

    const { rows: articles, count: total } = await Article.findAndCountAll({
      where,
      order: [[sort, order.toUpperCase()]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(total / limit);
    const baseUrl = \`\${req.protocol}://\${req.get('host')}\${req.baseUrl}\`;

    res.json({
      data: articles,
      meta: { page, limit, total, totalPages },
      links: {
        self: \`\${baseUrl}?page=\${page}&limit=\${limit}\`,
        first: \`\${baseUrl}?page=1&limit=\${limit}\`,
        last: \`\${baseUrl}?page=\${totalPages}&limit=\${limit}\`,
        ...(page < totalPages && { next: \`\${baseUrl}?page=\${page + 1}&limit=\${limit}\` }),
        ...(page > 1 && { prev: \`\${baseUrl}?page=\${page - 1}&limit=\${limit}\` }),
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/articles - Create new resource
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = CreateArticleSchema.parse(req.body);
    const article = await Article.create({ ...body, authorId: req.user.id });

    res.status(201)
      .header('Location', \`/api/v1/articles/\${article.id}\`)
      .json({ data: article });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const apiError: ApiError = {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: error.flatten().fieldErrors as Record<string, string[]>,
        },
      };
      return res.status(422).json(apiError);
    }
    next(error);
  }
});

export default router;`,
    codeLanguage: 'typescript',
    order: 5,
  },
  {
    title: 'Database Optimization',
    slug: 'database',
    description:
      'Claude designs efficient database schemas and writes optimized queries for PostgreSQL. It understands indexing strategies, query planning, normalization, migration patterns, and performance tuning. Claude generates queries that avoid N+1 problems, use proper joins, leverage database-specific features like JSONB operators, CTEs, and window functions.',
    category: CapabilityCategory.DATABASE,
    icon: 'Database',
    features: [
      'Schema design with proper normalization and constraints',
      'Index strategy optimization (B-tree, GIN, GiST, partial)',
      'Query performance analysis with EXPLAIN ANALYZE',
      'N+1 query detection and eager loading solutions',
      'PostgreSQL-specific features: JSONB, CTEs, window functions',
      'Migration generation with rollback support',
      'Connection pooling and query batching',
      'Full-text search with tsvector and ranking',
    ],
    codeExample: `-- PostgreSQL Optimization: Analytics Dashboard Query
-- Demonstrates CTEs, window functions, JSONB, and indexing

-- Indexes for optimal query performance
CREATE INDEX CONCURRENTLY idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX CONCURRENTLY idx_orders_customer_id ON orders (customer_id);
CREATE INDEX CONCURRENTLY idx_orders_status ON orders (status) WHERE status != 'cancelled';
CREATE INDEX CONCURRENTLY idx_order_items_order_id ON order_items (order_id);
CREATE INDEX CONCURRENTLY idx_products_category ON products USING GIN (categories);
CREATE INDEX CONCURRENTLY idx_products_metadata ON products USING GIN (metadata jsonb_path_ops);

-- Full-text search index
ALTER TABLE products ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ) STORED;

CREATE INDEX idx_products_search ON products USING GIN (search_vector);

-- Revenue analytics with period-over-period comparison
WITH current_period AS (
  SELECT
    date_trunc('day', o.created_at) AS day,
    COUNT(DISTINCT o.id) AS order_count,
    COUNT(DISTINCT o.customer_id) AS unique_customers,
    SUM(oi.quantity * oi.unit_price) AS revenue,
    AVG(oi.quantity * oi.unit_price) AS avg_order_value
  FROM orders o
  JOIN order_items oi ON o.id = oi.order_id
  WHERE o.created_at >= NOW() - INTERVAL '30 days'
    AND o.status != 'cancelled'
  GROUP BY date_trunc('day', o.created_at)
),
previous_period AS (
  SELECT
    date_trunc('day', o.created_at + INTERVAL '30 days') AS day,
    SUM(oi.quantity * oi.unit_price) AS revenue
  FROM orders o
  JOIN order_items oi ON o.id = oi.order_id
  WHERE o.created_at >= NOW() - INTERVAL '60 days'
    AND o.created_at < NOW() - INTERVAL '30 days'
    AND o.status != 'cancelled'
  GROUP BY date_trunc('day', o.created_at + INTERVAL '30 days')
),
top_products AS (
  SELECT
    p.id,
    p.name,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS product_revenue,
    RANK() OVER (ORDER BY SUM(oi.quantity * oi.unit_price) DESC) AS revenue_rank,
    p.metadata->>'supplier' AS supplier
  FROM products p
  JOIN order_items oi ON p.id = oi.product_id
  JOIN orders o ON oi.order_id = o.id
  WHERE o.created_at >= NOW() - INTERVAL '30 days'
    AND o.status != 'cancelled'
  GROUP BY p.id, p.name, p.metadata
)
SELECT
  cp.day,
  cp.order_count,
  cp.unique_customers,
  cp.revenue AS current_revenue,
  pp.revenue AS previous_revenue,
  ROUND(
    ((cp.revenue - COALESCE(pp.revenue, 0)) / NULLIF(pp.revenue, 0)) * 100, 2
  ) AS revenue_growth_pct,
  cp.avg_order_value,
  SUM(cp.revenue) OVER (ORDER BY cp.day) AS cumulative_revenue,
  AVG(cp.revenue) OVER (
    ORDER BY cp.day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS seven_day_moving_avg
FROM current_period cp
LEFT JOIN previous_period pp ON cp.day = pp.day
ORDER BY cp.day DESC;

-- Full-text search with ranking
SELECT
  id, name, description,
  ts_rank_cd(search_vector, query) AS rank
FROM products,
  plainto_tsquery('english', 'wireless bluetooth headphones') AS query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 20;`,
    codeLanguage: 'sql',
    order: 6,
  },
  {
    title: 'DevOps & Containerization',
    slug: 'devops',
    description:
      'Claude builds production-grade DevOps pipelines including Docker containerization, CI/CD workflows, infrastructure as code, and monitoring. It generates optimized multi-stage Dockerfiles, docker-compose configurations for local development, GitHub Actions pipelines, and deployment manifests with proper health checks, resource limits, and secrets management.',
    category: CapabilityCategory.DEVOPS,
    icon: 'Container',
    features: [
      'Multi-stage Docker builds with minimal image size',
      'Docker Compose for full local development environments',
      'GitHub Actions CI/CD pipeline generation',
      'Environment-specific configuration management',
      'Health check endpoints and readiness probes',
      'Log aggregation and structured logging',
      'Auto-scaling configuration and resource limits',
      'Secrets management with environment variable injection',
    ],
    codeExample: `# Docker Compose: Full-Stack Development Environment
# Claude Portfolio Application

version: '3.9'

services:
  # PostgreSQL Database
  db:
    image: postgres:16-alpine
    container_name: claude-portfolio-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: claude_portfolio
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/src/db/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: claude-portfolio-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: development
    container_name: claude-portfolio-api
    restart: unless-stopped
    environment:
      NODE_ENV: development
      PORT: 3001
      DATABASE_URL: postgresql://postgres:postgres@db:5432/claude_portfolio
      REDIS_URL: redis://redis:6379
      FRONTEND_URL: http://localhost:5173
    ports:
      - "3001:3001"
    volumes:
      - ./backend/src:/app/src
      - /app/node_modules
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/api/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s

  # Frontend (Vite + React)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: development
    container_name: claude-portfolio-ui
    restart: unless-stopped
    environment:
      VITE_API_URL: http://localhost:3001
    ports:
      - "5173:5173"
    volumes:
      - ./frontend/src:/app/src
      - /app/node_modules
    depends_on:
      backend:
        condition: service_healthy

  # Nginx Reverse Proxy (production-like)
  nginx:
    image: nginx:alpine
    container_name: claude-portfolio-proxy
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - backend
      - frontend
    profiles:
      - production

volumes:
  postgres_data:
    driver: local`,
    codeLanguage: 'yaml',
    order: 7,
  },
];

const projectsData: {
  capabilitySlug: string;
  projects: {
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string | null;
    githubUrl: string;
    liveUrl: string | null;
    featured: boolean;
  }[];
}[] = [
  {
    capabilitySlug: 'code-generation',
    projects: [
      {
        title: 'E-Commerce Dashboard',
        description:
          'A fully generated React + TypeScript admin dashboard with charts, data tables, authentication, and real-time notifications. Claude generated 47 components, 12 custom hooks, and complete routing in a single session.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'React Query', 'Zustand'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/ecommerce-dashboard',
        liveUrl: 'https://demo.example.com/dashboard',
        featured: true,
      },
      {
        title: 'CLI Task Manager',
        description:
          'A Node.js command-line task manager with SQLite persistence, fuzzy search, priority sorting, recurring tasks, and colorized terminal output. Generated with full test coverage and published to npm.',
        techStack: ['Node.js', 'TypeScript', 'SQLite', 'Commander.js', 'Chalk', 'Inquirer'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/cli-task-manager',
        liveUrl: null,
        featured: false,
      },
      {
        title: 'REST API Boilerplate Generator',
        description:
          'A code generation tool that scaffolds a complete Express + TypeScript API project with authentication, authorization, database models, migrations, tests, and Docker configuration from a simple YAML spec.',
        techStack: ['Node.js', 'TypeScript', 'Handlebars', 'YAML', 'Jest'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/api-generator',
        liveUrl: null,
        featured: false,
      },
    ],
  },
  {
    capabilitySlug: 'multi-agent',
    projects: [
      {
        title: 'Everything Claude Code',
        description:
          'A reference implementation of multi-agent orchestration with 18 specialized agents. Demonstrates task decomposition, parallel execution, inter-agent communication, and conflict resolution. The system builds entire applications from a single high-level prompt.',
        techStack: ['TypeScript', 'Claude API', 'WebSockets', 'Redis', 'Docker'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/everything-claude-code',
        liveUrl: null,
        featured: true,
      },
      {
        title: 'Autonomous Code Review Bot',
        description:
          'A GitHub bot that uses multiple Claude agents to review pull requests: one agent checks code quality, another reviews security, a third validates test coverage, and an orchestrator synthesizes their findings into a unified review comment.',
        techStack: ['TypeScript', 'GitHub Actions', 'Claude API', 'Probot', 'PostgreSQL'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/code-review-bot',
        liveUrl: null,
        featured: true,
      },
    ],
  },
  {
    capabilitySlug: 'tdd',
    projects: [
      {
        title: 'Payment Processing Library',
        description:
          'A payment processing library built entirely test-first. 94% code coverage across 340 tests covering Stripe integration, webhook handling, idempotency, retry logic, and currency conversion. Every feature started with a failing test.',
        techStack: ['TypeScript', 'Jest', 'Stripe SDK', 'PostgreSQL', 'Redis'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/payment-lib',
        liveUrl: null,
        featured: true,
      },
      {
        title: 'Form Validation Engine',
        description:
          'A schema-based form validation engine with 100% branch coverage. Supports async validators, conditional rules, cross-field validation, and custom error messages. The 280-test suite serves as living documentation.',
        techStack: ['TypeScript', 'Jest', 'Zod'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/form-validation',
        liveUrl: null,
        featured: false,
      },
      {
        title: 'State Machine Framework',
        description:
          'A finite state machine library developed with strict TDD. Covers state transitions, guards, actions, hierarchical states, and parallel regions. Mutation testing confirmed 97% of tests catch real bugs.',
        techStack: ['TypeScript', 'Vitest', 'XState-compatible API'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/state-machine',
        liveUrl: null,
        featured: false,
      },
    ],
  },
  {
    capabilitySlug: 'security',
    projects: [
      {
        title: 'AgentShield Security Scanner',
        description:
          'An automated security scanner that integrates into CI/CD pipelines. Performs SAST analysis, dependency auditing, secret detection, and OWASP Top 10 checks. Generates detailed reports with remediation steps and tracks security posture over time.',
        techStack: ['TypeScript', 'Node.js', 'GitHub Actions', 'Semgrep', 'Trivy'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/agent-shield',
        liveUrl: null,
        featured: true,
      },
      {
        title: 'Auth Middleware Suite',
        description:
          'A comprehensive authentication and authorization middleware suite supporting JWT, OAuth2, RBAC, and API key authentication. Includes rate limiting, session management, CSRF protection, and audit logging.',
        techStack: ['TypeScript', 'Express', 'jsonwebtoken', 'Passport.js', 'Redis'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/auth-suite',
        liveUrl: null,
        featured: false,
      },
    ],
  },
  {
    capabilitySlug: 'api-design',
    projects: [
      {
        title: 'Resource Management API',
        description:
          'A RESTful API for managing cloud resources with full CRUD, pagination, filtering, sorting, field selection, and HATEOAS links. Includes auto-generated OpenAPI 3.0 docs, versioning, rate limiting, and request validation.',
        techStack: ['TypeScript', 'Express', 'Sequelize', 'PostgreSQL', 'Swagger UI', 'Zod'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/resource-api',
        liveUrl: 'https://api.example.com/docs',
        featured: true,
      },
      {
        title: 'Event-Driven Notification API',
        description:
          'An API for managing multi-channel notifications (email, SMS, push, webhook). Features template rendering, delivery tracking, retry with exponential backoff, batch operations, and real-time status via SSE.',
        techStack: ['TypeScript', 'Express', 'BullMQ', 'Redis', 'PostgreSQL', 'SendGrid', 'Twilio'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/notification-api',
        liveUrl: null,
        featured: false,
      },
      {
        title: 'GraphQL Federation Gateway',
        description:
          'A federated GraphQL gateway that stitches together microservice schemas. Features automatic schema composition, query planning, caching directives, dataloader batching, and performance tracing with Apollo Studio.',
        techStack: ['TypeScript', 'Apollo Server', 'GraphQL', 'Redis', 'DataLoader'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/graphql-gateway',
        liveUrl: null,
        featured: false,
      },
    ],
  },
  {
    capabilitySlug: 'database',
    projects: [
      {
        title: 'Analytics Data Pipeline',
        description:
          'A PostgreSQL-optimized analytics pipeline processing 10M+ events/day. Uses materialized views, partitioned tables, parallel query execution, and custom aggregates. Achieved 50x query speedup through systematic optimization.',
        techStack: ['PostgreSQL', 'TimescaleDB', 'Node.js', 'Redis', 'Grafana'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/analytics-pipeline',
        liveUrl: null,
        featured: true,
      },
      {
        title: 'Multi-Tenant SaaS Schema',
        description:
          'A row-level security multi-tenant database design for SaaS applications. Features automatic tenant isolation via PostgreSQL RLS policies, shared schema with tenant-scoped indexes, and zero-downtime migration tooling.',
        techStack: ['PostgreSQL', 'Sequelize', 'TypeScript', 'Row-Level Security'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/multi-tenant-schema',
        liveUrl: null,
        featured: false,
      },
    ],
  },
  {
    capabilitySlug: 'devops',
    projects: [
      {
        title: 'Full-Stack Docker Template',
        description:
          'A production-ready Docker template for full-stack TypeScript applications. Multi-stage builds reduce image size by 80%. Includes hot-reload for development, health checks, graceful shutdown, log aggregation, and automated CI/CD with GitHub Actions.',
        techStack: ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions', 'PostgreSQL', 'Redis'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/fullstack-docker',
        liveUrl: null,
        featured: true,
      },
      {
        title: 'Infrastructure as Code Kit',
        description:
          'A Terraform + Pulumi infrastructure kit for deploying to AWS. Provisions VPC, ECS Fargate clusters, RDS PostgreSQL, ElastiCache Redis, CloudFront CDN, and ACM certificates. Includes cost estimation and drift detection.',
        techStack: ['Terraform', 'Pulumi', 'AWS', 'TypeScript', 'GitHub Actions'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/iac-kit',
        liveUrl: null,
        featured: false,
      },
      {
        title: 'Monitoring & Alerting Stack',
        description:
          'A complete observability stack with Prometheus metrics collection, Grafana dashboards, structured JSON logging with Pino, distributed tracing with OpenTelemetry, and PagerDuty alerting integration. All configured via Docker Compose.',
        techStack: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Pino', 'Docker Compose', 'PagerDuty'],
        imageUrl: null,
        githubUrl: 'https://github.com/example/monitoring-stack',
        liveUrl: null,
        featured: false,
      },
    ],
  },
];

async function seed(): Promise<void> {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established.');

    console.log('Syncing models (force: true to reset tables)...');
    await sequelize.sync({ force: true });
    console.log('Models synchronized.');

    console.log('Seeding capabilities...');
    const createdCapabilities = await Capability.bulkCreate(capabilities);
    console.log(`Created ${createdCapabilities.length} capabilities.`);

    // Build a map of slug -> id
    const capabilityMap = new Map<string, string>();
    for (const cap of createdCapabilities) {
      capabilityMap.set(cap.slug, cap.id);
    }

    console.log('Seeding projects...');
    let projectCount = 0;

    for (const group of projectsData) {
      const capabilityId = capabilityMap.get(group.capabilitySlug);
      if (!capabilityId) {
        console.warn(`Capability with slug "${group.capabilitySlug}" not found, skipping projects.`);
        continue;
      }

      for (const projectData of group.projects) {
        await Project.create({
          ...projectData,
          capabilityId,
        });
        projectCount++;
      }
    }

    console.log(`Created ${projectCount} projects.`);
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

seed();
