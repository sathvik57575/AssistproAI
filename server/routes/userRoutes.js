import express from 'express';
import { getPublishedCreations, getUserCreations, toggleLike } from '../controllers/userController.js';
import {auth} from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.get('/get-user-creations', auth, getUserCreations);
userRouter.get('/get-published-creations', auth, getPublishedCreations);
userRouter.post('/toggle-like', auth, toggleLike);


export {userRouter}

