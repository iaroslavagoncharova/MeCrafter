import express from 'express';

const router = express.Router();

router.use('/auth', authRoute)
router.use('/users', userRoute)

export default router;
