import { Router, Request, Response, NextFunction } from 'express';
import { Capability, Project } from '../db/models';

const router = Router();

// GET /api/capabilities - list all capabilities ordered by `order` field
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const capabilities = await Capability.findAll({
      order: [['order', 'ASC']],
    });
    res.json({ data: capabilities });
  } catch (error) {
    next(error);
  }
});

// GET /api/capabilities/:slug - get single capability with associated projects
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const capability = await Capability.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: Project,
          as: 'projects',
        },
      ],
    });

    if (!capability) {
      const error = new Error('Capability not found') as Error & { statusCode?: number };
      error.statusCode = 404;
      return next(error);
    }

    res.json({ data: capability });
  } catch (error) {
    next(error);
  }
});

export default router;
