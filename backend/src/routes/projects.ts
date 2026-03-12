import { Router, Request, Response, NextFunction } from 'express';
import { Project, Capability } from '../db/models';
import { WhereOptions } from 'sequelize';

const router = Router();

// GET /api/projects - list all projects, filterable by capabilityId and featured
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const where: WhereOptions = {};

    if (req.query.capabilityId) {
      where.capabilityId = req.query.capabilityId as string;
    }

    if (req.query.featured !== undefined) {
      where.featured = req.query.featured === 'true';
    }

    const projects = await Project.findAll({
      where,
      include: [
        {
          model: Capability,
          as: 'capability',
          attributes: ['id', 'title', 'slug', 'category', 'icon'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id - get single project
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.id as string;
    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: Capability,
          as: 'capability',
        },
      ],
    });

    if (!project) {
      const error = new Error('Project not found') as Error & { statusCode?: number };
      error.statusCode = 404;
      return next(error);
    }

    res.json({ data: project });
  } catch (error) {
    next(error);
  }
});

export default router;
