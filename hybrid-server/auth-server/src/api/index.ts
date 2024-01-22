import express from 'express';
import userRoute from './routes/userRoute';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

// router.use('/auth', authRoute)
router.use('/users', userRoute)

export default router;
