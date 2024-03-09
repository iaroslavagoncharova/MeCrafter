import express from 'express';
import {fetchMessages} from '../controllers/messageController';

const messageRouter = express.Router();
messageRouter.route('/').get(fetchMessages);

export default messageRouter;
