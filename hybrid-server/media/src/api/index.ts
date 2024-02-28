import express, {Request, Response} from 'express';
import postsRouter from './routes/postsRoute';
import commentRouter from './routes/commentRoute';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({message: 'Connected!'});
});

router.use('/posts', postsRouter);
router.use('/comments', commentRouter);

export default router;
